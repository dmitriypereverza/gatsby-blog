import { getPromiseCacheFunc } from "../cachedPromise";

test("test cachedPromiseTest", function (done) {
  const cachedPromise = getPromiseCacheFunc(1);

  const p1 = cachedPromise(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve("ok"), 100);
      }),
    "key1",
  );

  p1().then((data) => {
    expect(data).toBe("ok");
    cachedPromise(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve("must be from cache"), 100);
        }),
      "key1",
    )().then((data) => {
      expect(data).toBe("ok");
      done();
    });
  });
});
