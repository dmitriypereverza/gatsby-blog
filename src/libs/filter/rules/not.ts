import { FilterFuncInterface } from "libs/filter";

export const not = (func: FilterFuncInterface): FilterFuncInterface =>
  function (...args) {
    const res = func(...args);
    if (res === undefined) return undefined;
    return !res;
  };
