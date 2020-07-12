export function parseJsonSelf<T>(
  param: string,
  callbackError: (error: Error) => void,
): T {
  try {
    return JSON.parse(param) as T;
  } catch (error) {
    callbackError(error);
    return null;
  }
}
