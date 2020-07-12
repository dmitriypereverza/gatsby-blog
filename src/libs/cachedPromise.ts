export function getPromiseCacheFunc(seconds = 10) {
  const storage = new Map<
    string,
    { expiredTime: number; promiseResult: Promise<any> }
  >();

  function getNowSeconds() {
    return new Date().getTime() / 1000;
  }

  function add(key, result) {
    storage.set(key, {
      promiseResult: result,
      expiredTime: getNowSeconds() + seconds,
    });
  }

  function isExpired(key) {
    const { expiredTime } = storage.get(key);
    return getNowSeconds() > expiredTime;
  }

  return function <T>(
    promise: () => Promise<T>,
    key: string,
  ): () => Promise<any> {
    if (!storage.has(key) || isExpired(key)) {
      return () =>
        promise().then((promiseResult) => {
          add(key, promiseResult);
          return promiseResult;
        });
    }
    const { promiseResult } = storage.get(key);
    return () => Promise.resolve(promiseResult);
  };
}
