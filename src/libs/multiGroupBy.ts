import { curry } from "ramda";

export const multiGroupBy = curry(function <T>(
  getGroupKeys: (el: T) => (string | number)[],
  list: T[],
): { [key: string]: T[] } {
  return [...list].reduce((acc, el) => {
    const groupKeys = getGroupKeys(el);
    groupKeys.forEach((key) => {
      if (key) acc[key] = acc[key] ? [...acc[key], el] : [el];
    });
    return acc;
  }, {});
});
