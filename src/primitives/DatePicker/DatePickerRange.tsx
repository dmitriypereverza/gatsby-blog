import React from "react";
import { DateRangePicker, IDateRangeShortcut } from "@blueprintjs/datetime";
import moment, { Moment } from "moment";
import { compose, isNil, map, reverse } from "ramda";

import ClickOutside from "primitives/ClickOutside/ClickOutside";
import Wrapper from "primitives/Wrapper";

import ContentPanel from "components/ContentPanel";

import { left, padding, position, top, zIndex } from "libs/styles";

import useDatePicker, {
  BaseDatePickerInterface,
  datePickerDefaultProps,
} from "./base";
import { DatePickerMode } from "./DatePicker";

const now = moment().toDate();

const shortcuts: IDateRangeShortcut[] = [
  {
    dateRange: [now, now],
    includeTime: true,
    label: "Сегодня",
  },
  {
    dateRange: [now, moment().add(1, "day").toDate()],
    includeTime: true,
    label: "Сегодня - Завтра",
  },
  {
    dateRange: [now, moment().add(1, "week").toDate()],
    includeTime: true,
    label: "Текущая неделя",
  },
  {
    dateRange: [now, moment().add(2, "week").toDate()],
    includeTime: true,
    label: "Две недели",
  },
  {
    dateRange: [now, moment().add(1, "month").toDate()],
    includeTime: true,
    label: "Месяц",
  },
  {
    dateRange: [now, moment().add(3, "month").toDate()],
    includeTime: true,
    label: "3 месяца",
  },
  {
    dateRange: [now, moment().add(6, "month").toDate()],
    includeTime: true,
    label: "6 месяцев",
  },
  {
    dateRange: [now, moment().add(1, "year").toDate()],
    includeTime: true,
    label: "Год",
  },
  {
    dateRange: [new Date(-100000000), new Date(-100000000)],
    includeTime: true,
    label: "",
  },
  {
    dateRange: [moment().add(-1, "day").toDate(), now],
    includeTime: true,
    label: "Вчера - Сегодня",
  },
  {
    dateRange: [moment().add(-1, "week").toDate(), now],
    includeTime: true,
    label: "Предыдущая неделя",
  },
  {
    dateRange: [moment().add(-1, "month").toDate(), now],
    includeTime: true,
    label: "Предыдущий месяц",
  },
  {
    dateRange: [moment().add(-1, "year").toDate(), now],
    includeTime: true,
    label: "Предыдущий год",
  },
];

interface DatePickerInterface extends BaseDatePickerInterface {
  children: (
    value: [string, string],
    opened: boolean,
    error: string,
    open: () => void,
    close: () => void,
  ) => React.ReactNode;
  value: [string, string];
  onChange: (value: [string, string]) => void;
}

export const DatePickerRangeMode = {
  DATE: { ...DatePickerMode.DATE, Component: DateRangePicker },
  DATE_TIME: { ...DatePickerMode.DATE_TIME, Component: DateRangePicker },
};

function DatePickerComponent({
  mode,
  min,
  max,
  top: topValue,
  wrapperStyles,
  value,
  children,
  onChange,
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
    close: closePicker,
    setError,
  } = useDatePicker({ mode, min, max });

  const [currentValue, setCurrentValue] = React.useState<Moment[]>([]);
  const [isSecondSelect, setIsSecondSelect] = React.useState(false);

  React.useEffect(() => {
    if (!currentValue.length) return;

    if (minDate && currentValue[0].isBefore(minDate)) {
      setError("Выбранная дата меньше минимальной");
      return;
    }

    if (maxDate && currentValue[1].isAfter(maxDate)) {
      setError("Выбранная дата больше максимальной");
      return;
    }

    if (error) setError(null);
  }, [currentValue, minDate, maxDate]);

  React.useEffect(() => {
    setCurrentValue(
      value
        ? [moment(value[0], inputFormat), moment(value[1], inputFormat)]
        : [],
    );
  }, [value]);

  function onChangePicker(
    [newDate, newDateSimilar]: [Date, Date],
    isUserChange?: boolean,
  ) {
    if (!isNil(isUserChange) && !isUserChange) return;
    const date = newDate || newDateSimilar;
    let result: Moment[] = [];
    if (isSecondSelect) {
      result = [currentValue[0], moment(date)];
      if (result[0].isAfter(result[1])) {
        result = reverse(result);
      }
    } else {
      result = [moment(date), currentValue[1]];
    }

    onChange(
      result[0].isValid() && result[1].isValid()
        ? (map(
            compose((m) => m.format(inputFormat), moment),
            result,
          ) as any)
        : [],
    );

    setIsSecondSelect(!isSecondSelect);
  }

  const result: any = {};

  if (currentValue.length) {
    result.dateRange = error
      ? [minDate, minDate]
      : [currentValue[0].toDate(), currentValue[1].toDate()];
    result.value = result.dateRange;
  }

  function close() {
    closePicker();
    setIsSecondSelect(false);
  }

  return (
    <ClickOutside handleEnabled={opened} handleClickOut={close}>
      <Wrapper styles={[position("relative"), wrapperStyles]}>
        {children(
          result.dateRange
            ? [
                currentValue[0].format(outputTextFormat),
                currentValue[1].format(outputTextFormat),
              ]
            : value,
          opened,
          error,
          open,
          close,
        )}
        {opened && (
          <ContentPanel
            styles={[
              padding(0),
              position("absolute"),
              top(topValue),
              left(0),
              zIndex(1),
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

DatePickerComponent.defaultProps = datePickerDefaultProps;

// TODO: dont work
export default React.memo(DatePickerComponent);
