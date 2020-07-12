import { equals } from "ramda";

export default <T, R>(modifyData: (data: T) => R) => {
  let result;
  return (data: T): R => {
    const newData = modifyData(data);
    if (!equals(result, newData)) {
      result = newData;
    }
    return result;
  };
};
