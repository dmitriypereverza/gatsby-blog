import React from "react";
import moment from "moment";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import { LocaleUtils } from "react-day-picker";

import { DateMode } from "libs/date";
import { useToggle } from "libs/hooks";

import "./index.scss";

const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const localeUtils: LocaleUtils = {
  // @ts-ignore
  ...LocaleUtils,
  formatMonthTitle: (d: Date) => MONTHS[d.getMonth()] + " " + d.getFullYear(),
  formatWeekdayShort: (i: number) => WEEKDAYS_SHORT[i],
  getFirstDayOfWeek: () => 1,
  getMonths: () => MONTHS,
};

export interface DatePickerModeInterface {
  className?: string;
  inputFormat: DateMode;
  outputTextFormat: DateMode;
  componentProps: Record<string, any>;
  Component: any;
}

export interface BaseDatePickerInterface {
  mode: DatePickerModeInterface;
  top: number | string;
  min?: string;
  max?: string;
  wrapperStyles?: any;
  initialOpened?: boolean;
}

export const datePickerDefaultProps = {
  min: moment().subtract(200, "year").format(DateMode.DATE_TIME),
  max: moment().add(200, "year").format(DateMode.DATE_TIME),
};

export default function useDatePicker({
  initialOpened,
  mode,
  max,
  min,
}: Pick<BaseDatePickerInterface, "initialOpened" | "mode" | "min" | "max">) {
  const { inputFormat } = mode;

  const minDate = React.useMemo(
    () =>
      min
        ? moment(min, inputFormat)
        : moment(datePickerDefaultProps.min, DateMode.DATE_TIME),
    [min],
  );
  const maxDate = React.useMemo(
    () =>
      max
        ? moment(max, inputFormat)
        : moment(datePickerDefaultProps.max, DateMode.DATE_TIME),
    [max],
  );

  const [error, setError] = React.useState<string>(null);

  const [opened, toggleOpened] = useToggle(initialOpened || false);
  return {
    mode,
    timeFrames: {
      minDate: minDate && minDate.toDate(),
      maxDate: maxDate && maxDate.toDate(),
    },
    minDate,
    maxDate,
    opened,
    error,
    open: () => toggleOpened(true),
    close: () => toggleOpened(false),
    toggle: () => toggleOpened(),
    setError,
  };
}
