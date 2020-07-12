import React from "react";
import {
  DatePicker,
  IDatePickerShortcut,
  TimePicker,
} from "@blueprintjs/datetime";
import moment, { Moment } from "moment";
import { isNil } from "ramda";

import ClickOutside from "primitives/ClickOutside/ClickOutside";
import Wrapper from "primitives/Wrapper";

import ContentPanel from "components/ContentPanel";

import { DateMode } from "libs/date";
import {
  boxShadow,
  left,
  padding,
  position,
  right,
  top,
  zIndex,
} from "libs/styles";

import useDatePicker, {
  BaseDatePickerInterface,
  datePickerDefaultProps,
  localeUtils,
} from "./base";

const shortcuts: IDatePickerShortcut[] = [
  {
    date: moment().toDate(),
    includeTime: true,
    label: "Сегодня",
  },
  {
    date: moment().add(1, "day").toDate(),
    includeTime: true,
    label: "Завтра",
  },
  {
    date: moment().add(1, "week").toDate(),
    includeTime: true,
    label: "Через неделю",
  },
  {
    date: moment().add(2, "week").toDate(),
    includeTime: true,
    label: "Через 2 недели",
  },
  {
    date: moment().add(1, "month").toDate(),
    includeTime: true,
    label: "Через месяц",
  },
  {
    date: moment().add(3, "month").toDate(),
    includeTime: true,
    label: "Через 3 месяца",
  },
  {
    date: moment().add(6, "month").toDate(),
    includeTime: true,
    label: "Через 6 месяцев",
  },
  {
    date: moment().add(1, "year").toDate(),
    includeTime: true,
    label: "Через год",
  },
  {
    date: new Date(-100000000),
    includeTime: true,
    label: "",
  },
  {
    date: moment().add(-1, "day").toDate(),
    includeTime: true,
    label: "Вчера",
  },
  {
    date: moment().add(-1, "week").toDate(),
    includeTime: true,
    label: "Неделю назад",
  },
  {
    date: moment().add(-1, "month").toDate(),
    includeTime: true,
    label: "Месяц назад",
  },
  {
    date: moment().add(-1, "year").toDate(),
    includeTime: true,
    label: "Год назад",
  },
];

interface DatePickerInterface extends BaseDatePickerInterface {
  value: string;
  onRight?: boolean;
  closeOnSelect?: boolean;
  children: (data: {
    value: string;
    opened: boolean;
    error: string;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => React.ReactNode;
  onChange: (value: string) => void;
  onClose?: () => void;
  initialOpened?: boolean;
  format?: string;
}

export const DatePickerMode = {
  DATE: {
    className: "date-picker date-picker-date",
    inputFormat: DateMode.DATE,
    outputTextFormat: DateMode.DAY_MONTH_YEAR,
    Component: DatePicker,
    componentProps: {
      highlightCurrentDay: true,
      locale: "ru",
      localeUtils,
    },
  },
  SHORT_DATE: {
    className: "date-picker date-picker-date",
    inputFormat: DateMode.DATE,
    outputTextFormat: DateMode.DATE,
    Component: DatePicker,
    componentProps: {
      highlightCurrentDay: true,
      locale: "ru",
      localeUtils,
    },
  },
  DATE_TIME: {
    className: "date-picker date-picker-date",
    inputFormat: DateMode.DATE_TIME,
    outputTextFormat: DateMode.DAY_MONTH_YEAR_TIME,
    Component: DatePicker,
    componentProps: {
      highlightCurrentDay: true,
      locale: "ru",
      localeUtils,
      includeTime: true,
      timePrecision: "minute",
      timePickerProps: {
        showArrowButtons: true,
      },
    },
  },
  TIME: {
    className: "date-picker date-picker-time",
    inputFormat: DateMode.TIME,
    outputTextFormat: DateMode.TIME,
    Component: TimePicker,
    componentProps: {
      precision: "minute",
      showArrowButtons: true,
    },
  },
};

function DatePickerRangeComponent({
  format,
  mode,
  initialOpened,
  min,
  max,
  top: topValue,
  wrapperStyles,
  value,
  children,
  onChange,
  onClose,
  closeOnSelect = false,
  onRight,
}: DatePickerInterface) {
  const {
    mode: {
      outputTextFormat,
      inputFormat,
      Component,
      componentProps,
      className: pickerClassName,
    },
    minDate,
    maxDate,
    timeFrames,
    error,
    opened,
    open,
    close,
    toggle,
    setError,
  } = useDatePicker({
    initialOpened,
    mode,
    min,
    max,
  });

  const [currentValue, setCurrentValue] = React.useState<Moment>(null);

  React.useEffect(() => {
    if (!currentValue || mode.inputFormat === DateMode.TIME) return;

    if (minDate && currentValue.isBefore(minDate)) {
      setError("Выбранная дата меньше минимальной");
      return;
    }

    if (maxDate && currentValue.isAfter(maxDate)) {
      setError("Выбранная дата больше максимальной");
      return;
    }

    if (error) setError(null);
  }, [currentValue, minDate, maxDate]);

  React.useEffect(() => {
    setCurrentValue(value ? moment(value, inputFormat) : null);
  }, [value]);

  function onChangePicker(date: Date, isUserChange?: boolean) {
    if (!isNil(isUserChange) && !isUserChange) return;
    if (closeOnSelect) {
      close();
    }

    const newDate = moment(date);
    if (newDate.isValid()) {
      onChange(newDate.format(inputFormat));
      return;
    }
    onChange(null);
  }

  const result: any = {};

  if (currentValue) {
    result.value = error
      ? minDate
        ? minDate.toDate()
        : null
      : currentValue.toDate();
  } else if (minDate && maxDate) {
    result.initialMonth = moment().isBetween(minDate, maxDate)
      ? moment().toDate()
      : minDate.toDate();
  }

  return (
    <ClickOutside
      handleEnabled={opened}
      handleClickOut={() => {
        close();
        onClose && onClose();
      }}
    >
      <Wrapper styles={[position("relative"), wrapperStyles]}>
        {children({
          value: currentValue
            ? currentValue.format(format || outputTextFormat)
            : value,
          opened,
          error,
          open,
          close,
          toggle,
        })}
        {opened && (
          <ContentPanel
            styles={[
              padding(0),
              position("absolute"),
              top(topValue),
              onRight ? right(0) : left(0),
              zIndex(2),
              boxShadow([0, 0, 16, "blackTransparent"]),
            ]}
          >
            <Component
              className={pickerClassName}
              shortcuts={shortcuts}
              {...result}
              {...timeFrames}
              {...componentProps}
              onChange={onChangePicker}
            />
          </ContentPanel>
        )}
      </Wrapper>
    </ClickOutside>
  );
}

DatePickerRangeComponent.defaultProps = datePickerDefaultProps;

export default React.memo(DatePickerRangeComponent);
