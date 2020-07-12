import { complement, isNil } from "ramda";

export const isNotNil = complement(isNil);

export function extendParams<T, G>(extendFunc: (el: T) => G) {
  return (el: T): T & G => {
    return {
      ...el,
      ...extendFunc(el),
    };
  };
}
