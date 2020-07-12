import { path } from "ramda";

import { FilterFuncInterface } from "libs/filter";

export const filterFieldEqualsTargetValue = ({
  filterField,
}: {
  filterField: string;
}): FilterFuncInterface =>
  function (filter: any, target: any) {
    if (target === undefined) return undefined;
    const filterData = path(filterField.split("."), filter);
    if (filterData === undefined) return undefined;
    return filterData === target;
  };
