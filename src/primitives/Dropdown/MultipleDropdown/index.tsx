import React, { Fragment } from "react";
import { append, remove } from "ramda";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Checkbox from "primitives/Checkbox";
import Button, { ButtonType } from "primitives/Button";

import {
  Aligns,
  backgroundColor,
  capitalizeFirstLetter,
  color,
  flex,
  flexValue,
  fullWidth,
  height,
  jc,
  minHeight,
  overflow,
  padding,
  paddingLeft,
  pointer,
} from "libs/styles";
import { useEffectSkipFirst, useToggle } from "libs/hooks";
import isEqual from "libs/decorators/performance/isEqual";

import DropdownListWrapper from "../DefaultDropdown/DropdownListWrapper";
import {
  DropdownComponentInterface,
  dropdownDefaultProps,
} from "../DefaultDropdown";
import { SuggestRowWrapper } from "../DefaultDropdown/SuggestRow";
import DefaultInputContentWrapper from "../DefaultDropdown/DefaultInputContentWrapper";

import SuggestInterface from "types/SuggestInterface";

export interface SuggestsGroup {
  suggests: SuggestInterface[];
  groupName?: string;
}

export interface MultipleDropdownInterface
  extends Pick<
    DropdownComponentInterface,
    | "suggestElementHeight"
    | "suggestElementStyles"
    | "renderOnRight"
    | "suggestHeight"
    | "suggestWidth"
    | "title"
    | "placeholder"
    | "disable"
    | "styles"
    | "outerStyles"
    | "placement"
  > {
  realtimeChangeTrigger?: boolean;
  suggests: SuggestsGroup[];
  checkedElements?: SuggestInterface[];
  renderInputContainer?: (
    opened: boolean,
    checkedElements: SuggestInterface[],
    setToggle: (opened?: boolean) => void,
  ) => JSX.Element;
  onCheck: (data: SuggestInterface[]) => void;
  suggestWrapper?: (
    suggest: SuggestInterface,
    children: JSX.Element,
  ) => JSX.Element;
}

const SuggestRow = React.memo(
  ({
    suggest,
    selected,
    onSelect,
    suggestWrapper,
  }: {
    suggest: SuggestInterface;
    selected: boolean;
    suggestWrapper: (
      suggest: SuggestInterface,
      children: JSX.Element,
    ) => JSX.Element;
    onSelect: () => void;
  }) => {
    const element = (
      <Wrapper
        styles={[
          fullWidth,
          pointer,
          overflow("hidden"),
          padding(10),
          paddingLeft(12),
          flex,
          jc(Aligns.SPACE_BETWEEN),
        ]}
      >
        <Wrapper styles={[overflow("auto"), fullWidth]}>
          <Checkbox
            styles={[fullWidth, jc(Aligns.SPACE_BETWEEN)]}
            title={suggest.title}
            selected={selected}
          />
        </Wrapper>
      </Wrapper>
    );

    return (
      <SuggestRowWrapper onClick={onSelect}>
        {suggestWrapper ? suggestWrapper(suggest, element) : element}
      </SuggestRowWrapper>
    );
  },
);

const Group = React.memo(function (data: {
  name: string;
  buttonIsSelectAll: boolean;
  onButtonClick: () => void;
}) {
  return (
    <Wrapper
      styles={[
        fullWidth,
        flex,
        jc(Aligns.SPACE_BETWEEN),
        padding("4px 12px"),
        backgroundColor("dimmedBlue1"),
      ]}
    >
      <Typography type="mediumCaption" color="dimmedBlue3">
        {data.name}
      </Typography>
      <Button
        outerStyles={[minHeight(20), height(20)]}
        type={ButtonType.text}
        onClick={data.onButtonClick}
      >
        {data.buttonIsSelectAll ? "Выбрать все" : "Снять все"}
      </Button>
    </Wrapper>
  );
});

function renderSuggest(
  checkedElements: SuggestInterface[],
  onCheck: (elements: SuggestInterface[]) => void,
  suggestWrapper: (
    suggest: SuggestInterface,
    children: JSX.Element,
  ) => JSX.Element,
) {
  const findSuggestIndexInCheckedElements = (suggest: SuggestInterface) =>
    checkedElements
      ? checkedElements.findIndex((element) => element.code === suggest.code)
      : -1;

  return function (
    { groupName, suggests }: MultipleDropdownInterface["suggests"][0],
    key: number,
  ) {
    const elements = suggests.map((suggest, key) => (
      <SuggestRow
        key={key}
        selected={findSuggestIndexInCheckedElements(suggest) !== -1}
        suggest={suggest}
        suggestWrapper={suggestWrapper}
        onSelect={() => {
          const selectedSuggestIndex = findSuggestIndexInCheckedElements(
            suggest,
          );
          onCheck(
            selectedSuggestIndex === -1
              ? append(suggest, checkedElements)
              : remove(selectedSuggestIndex, 1, checkedElements),
          );
        }}
      />
    ));

    if (!groupName) return <Fragment key={key}>{elements}</Fragment>;

    const buttonIsSelectAll = !!suggests.find(
      (suggest) => findSuggestIndexInCheckedElements(suggest) === -1,
    );

    return (
      <Fragment key={key}>
        <Group
          name={groupName}
          buttonIsSelectAll={buttonIsSelectAll}
          onButtonClick={() => onCheck(buttonIsSelectAll ? suggests : [])}
        />
        {elements}
      </Fragment>
    );
  };
}

function calculateElementsFullWidth(
  suggests: MultipleDropdownInterface["suggests"],
  suggestElementHeight: number,
) {
  if (!suggests) return null;
  return suggests.reduce(
    (acc, suggest) => acc + suggest.suggests.length * suggestElementHeight,
    0,
  );
}

function convertSuggestsToObjectByCode(suggests: SuggestInterface[]) {
  const result: Record<string, string> = {};
  suggests.forEach(({ code, title }) => (result[code] = title));
  return result;
}

const MultipleDropdown = ({
  suggestElementHeight,
  realtimeChangeTrigger,
  renderOnRight,
  styles,
  outerStyles,
  title,
  suggests,
  suggestHeight,
  suggestWidth,
  checkedElements: checkedElementsProp,
  placeholder,
  disable,
  onCheck: onCheckProp,
  renderInputContainer,
  suggestWrapper,
}: MultipleDropdownInterface) => {
  const [isOpen, setOpen] = useToggle(false);
  const [checkingBuffer, setCheckingBuffer] = React.useState(
    checkedElementsProp,
  );

  React.useEffect(() => {
    if (disable) {
      setOpen(false);
    }
  }, [disable]);

  React.useEffect(() => {
    if (realtimeChangeTrigger) return;
    setCheckingBuffer(checkedElementsProp);
  }, [checkedElementsProp]);

  const onCheck = (data: SuggestInterface[]) => {
    if (realtimeChangeTrigger) {
      onCheckProp(data);
      return;
    }
    setCheckingBuffer(data);
  };

  const checkedElements = realtimeChangeTrigger
    ? checkedElementsProp
    : checkingBuffer;

  useEffectSkipFirst(() => {
    if (realtimeChangeTrigger) return;
    if (isOpen) return;
    if (
      isEqual(
        convertSuggestsToObjectByCode(checkingBuffer),
        convertSuggestsToObjectByCode(checkedElementsProp),
      )
    )
      return;

    onCheckProp(checkingBuffer);
  }, [isOpen]);

  return (
    <DropdownListWrapper
      suggests={suggests}
      suggestHeight={suggestHeight}
      suggestWidth={suggestWidth}
      styles={[flexValue(1), outerStyles]}
      opened={isOpen}
      renderOnRight={renderOnRight}
      elementsFullHeight={calculateElementsFullWidth(
        suggests,
        suggestElementHeight,
      )}
      renderSuggest={renderSuggest(checkedElements, onCheck, suggestWrapper)}
      setOpen={setOpen}
    >
      {(opened, setToggle) =>
        renderInputContainer ? (
          renderInputContainer(opened, checkedElements, setToggle)
        ) : (
          <DefaultInputContentWrapper
            styles={styles}
            title={title}
            opened={opened}
            disable={disable}
            setToggle={setToggle}
          >
            <Typography
              useDotes
              type="regularBody1"
              styles={[
                capitalizeFirstLetter,
                disable
                  ? color("dimmedBlue2")
                  : color(
                      checkedElements.length === 0
                        ? "dimmedBlue2"
                        : "dimmedBlue4",
                    ),
              ]}
            >
              {checkedElements
                ? checkedElements.map((val) => val.title).join(", ") ||
                  placeholder
                : placeholder}
            </Typography>
          </DefaultInputContentWrapper>
        )
      }
    </DropdownListWrapper>
  );
};

MultipleDropdown.defaultProps = {
  ...dropdownDefaultProps,
  realtimeChangeTrigger: true,
};

export default React.memo(MultipleDropdown);
