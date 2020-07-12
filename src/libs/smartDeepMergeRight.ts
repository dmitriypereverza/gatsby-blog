import { mergeWithKey } from "ramda";

function isObject(x: any) {
  return Object.prototype.toString.call(x) === "[object Object]";
}
export const smartDeepMergeRight = (deepLevelThreshold: number) => {
  return function mergeDeepWithKey(lObj, rObj, _level = 1) {
    return mergeWithKey(
      (_, lVal, rVal) => {
        if (isObject(lVal) && isObject(rVal) && _level < deepLevelThreshold) {
          return mergeDeepWithKey(lVal, rVal, _level + 1);
        }
        return rVal;
      },
      lObj,
      rObj,
    );
  };
};
