import React from "react";
import { Placement } from "@popperjs/core";

import Typography from "primitives/Typography";

import { capitalizeFirstLetter, color, flexValue } from "libs/styles";
import { useToggle } from "libs/hooks";

import DropdownListWrapper from "./DropdownListWrapper";
import SuggestRow from "./SuggestRow";
import DefaultInputContentWrapper from "./DefaultInputContentWrapper";

import SuggestInterface from "types/SuggestInterface";

export interface DropdownComponentInterface {
  suggestElementHeight?: number;
  suggestElementStyles?: any;
  renderOnRight?: boolean;
  suggests: SuggestInterface[];
  selectedElement?: SuggestInterface;
  suggestHeight?: number;
  suggestWidth?: string | number;
  title?: string;
  constElements?: SuggestInterface[];
  defaultElement?: SuggestInterface;
  placeholder?: string;
  disable?: boolean;
  styles?: any;
  outerStyles?: any;
  placement?: Placement;
  renderInputContainer?: (
    opened: boolean,
    selectedElement: SuggestInterface,
    setToggle: (opened?: boolean) => void,
  ) => JSX.Element;
  onSelect: (data: SuggestInterface) => void;
}

const verticalPadding = 8;

export function calculateDefaultDropdownElementsFullHeight(
  suggests: any[],
  suggestElementHeight: number,
) {
  if (!suggests) return 0;
  return suggests.length * suggestElementHeight + verticalPadding;
}

function calculateElementsFullHeight(
  suggests: DropdownComponentInterface["suggests"],
  constElements: DropdownComponentInterface["constElements"],
  suggestElementHeight: number,
) {
  if (!suggests) return 0;
  const value = calculateDefaultDropdownElementsFullHeight(
    suggests,
    suggestElementHeight,
  );
  if (constElements && constElements.length)
    return value + suggestElementHeight * constElements.length;

  return value;
}

const Dropdown = ({
  suggestElementHeight,
  suggestElementStyles,
  renderOnRight,
  styles,
  outerStyles,
  title,
  suggests,
  suggestHeight,
  suggestWidth,
  selectedElement,
  constElements,
  defaultElement,
  placeholder,
  placement,
  disable,
  onSelect,
  renderInputContainer,
}: DropdownComponentInterface) => {
  const [isOpen, setOpen] = useToggle(false);

  const onSelectTarget = (suggest: SuggestInterface) => {
    onSelect(suggest);
    setOpen(false);
  };

  return (
    <DropdownListWrapper
      suggests={suggests}
      suggestHeight={suggestHeight}
      suggestWidth={suggestWidth}
      defaultElements={constElements}
      styles={[flexValue(1), outerStyles]}
      opened={isOpen}
      placement={placement}
      elementsFullHeight={calculateElementsFullHeight(
        suggests,
        constElements,
        suggestElementHeight,
      )}
      renderOnRight={renderOnRight}
      renderSuggest={(suggest) => (
        <SuggestRow
          key={suggest.code + suggest.title}
          styles={suggestElementStyles}
          selected={selectedElement && selectedElement.code === suggest.code}
          title={suggest.title}
          onSelect={() => onSelectTarget(suggest)}
        />
      )}
      setOpen={setOpen}
    >
      {(opened, setToggle) =>
        renderInputContainer ? (
          renderInputContainer(opened, selectedElement, setToggle)
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
                      isNoEmptySuggestElement(selectedElement, defaultElement)
                        ? "dimmedBlue4"
                        : "dimmedBlue2",
                    ),
              ]}
            >
              {selectedElement
                ? selectedElement.title
                : defaultElement
                ? defaultElement.title
                : placeholder}
            </Typography>
          </DefaultInputContentWrapper>
        )
      }
    </DropdownListWrapper>
  );
};

export const dropdownDefaultProps = {
  suggestWidth: "100%",
  suggestHeight: 490,
  suggestElementHeight: 47,
};

Dropdown.defaultProps = dropdownDefaultProps;

export default React.memo(Dropdown);

export function isNoEmptySuggestElement(
  selected: SuggestInterface,
  defaultSelected: SuggestInterface,
) {
  if (!selected) return false;
  if (!defaultSelected) return true;
  return selected.code !== defaultSelected.code;
}

export function createDefaultSuggest(
  title: string,
  code = "none",
): SuggestInterface {
  return { code, title };
}
