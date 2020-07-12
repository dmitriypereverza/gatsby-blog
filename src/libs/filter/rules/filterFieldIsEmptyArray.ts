import { path } from "ramda";

import { FilterFuncInterface } from "libs/filter";

export const filterFieldIsEmptyArray = ({
  filterField,
}: {
  filterField: string;
}): FilterFuncInterface =>
  function (filter: any) {
    const filterValue = path(filterField.split("."), filter);
    if (!Array.isArray(filterValue)) return undefined;
    return filterValue.length === 0;
  };
