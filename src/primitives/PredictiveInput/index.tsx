import React, { useEffect, useRef, useState } from "react";

import SuggestRow from "primitives/Dropdown/DefaultDropdown/SuggestRow";
import DropdownListWrapper from "primitives/Dropdown/DefaultDropdown/DropdownListWrapper";
import {
  calculateDefaultDropdownElementsFullHeight,
  DropdownComponentInterface,
  dropdownDefaultProps,
} from "primitives/Dropdown/DefaultDropdown";
import Input from "primitives/Input";
import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  capitalizeFirstLetter,
  flexValue,
  overflow,
  padding,
} from "libs/styles";
import { useBoolean, useDebouncedInput } from "libs/hooks";
import searchInString from "libs/searchInString";

import SuggestInterface from "types/SuggestInterface";

interface PredictiveInputInterface
  extends Omit<
    DropdownComponentInterface,
    "defaultElement" | "constElements" | "renderInputContainer"
  > {
  suggestsLoading?: boolean;
}

function getSuggestTitle(element: SuggestInterface) {
  return element ? element.title : "";
}

function filterSuggestions(userInput: string, suggestions: SuggestInterface[]) {
  return suggestions.filter((suggestion) =>
    searchInString(getSuggestTitle(suggestion), userInput),
  );
}

const PredictiveInput = ({
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
  placeholder,
  disable,
  onSelect,
  suggestsLoading,
}: PredictiveInputInterface) => {
  const [listOpened, openList, closeList] = useBoolean(false);

  const [initialText] = useState(getSuggestTitle(selectedElement));

  const [filteredResults, setFilteredResults] = useState<SuggestInterface[]>(
    [],
  );

  useEffect(() => {
    const newTitle = getSuggestTitle(selectedElement);
    if (newTitle !== inputValue) onInput(newTitle, false);
  }, [selectedElement]);

  const onTextChangeHandler = useRef(
    (
      text: string,
      options: { suggests: SuggestInterface[]; needOpenList: boolean },
    ) => {
      if (text === "") {
        onSelect(null);
      }
      if (text.length < 3) {
        closeList();
        setFilteredResults([]);
        return;
      }
      if (options.needOpenList) openList();

      setFilteredResults(filterSuggestions(text, options.suggests));
    },
  );

  const { inputValue, onInputChange } = useDebouncedInput(
    initialText,
    600,
    onTextChangeHandler.current,
    3,
  );

  const onInput = (text: string, needOpenList = true) => {
    return onInputChange(text, {
      suggests,
      needOpenList,
    });
  };

  function onSelectElement(suggest: SuggestInterface) {
    onSelect(suggest);
    closeList();
    onInput(getSuggestTitle(selectedElement), false);
  }

  return (
    <DropdownListWrapper
      suggests={filteredResults}
      suggestHeight={suggestHeight}
      suggestWidth={suggestWidth}
      styles={[flexValue(1), outerStyles]}
      opened={listOpened}
      emptySuggestElement={
        <SuggestRow
          selected={false}
          title={null}
          render={
            <Wrapper styles={[overflow("auto")]}>
              <Typography
                useDotes
                color="dimmedBlue2"
                type="regularBody1"
                styles={[capitalizeFirstLetter, padding("3px 0")]}
              >
                Нет результатов
              </Typography>
            </Wrapper>
          }
          onSelect={() => {}}
        />
      }
      elementsFullHeight={calculateDefaultDropdownElementsFullHeight(
        filteredResults.length === 0 ? [true] : filteredResults,
        suggestElementHeight,
      )}
      renderOnRight={renderOnRight}
      renderSuggest={(suggest) => (
        <SuggestRow
          key={suggest.code + suggest.title}
          styles={suggestElementStyles}
          selected={selectedElement && selectedElement.code === suggest.code}
          title={suggest.title}
          onSelect={() => onSelectElement(suggest)}
        />
      )}
      setOpen={(opened) => {
        if (opened) return;
        setFilteredResults([]);
        closeList();
        onInput(getSuggestTitle(selectedElement), false);
      }}
      suggestsLoading={suggestsLoading}
    >
      {() => (
        <Input
          styles={styles}
          value={inputValue}
          title={title}
          placeholder={placeholder}
          icon={inputValue ? "xClose" : null}
          disable={disable}
          onChange={onInput}
          iconOnClick={(ev) => {
            ev.stopPropagation();
            closeList();
            onInput("", false);
          }}
        />
      )}
    </DropdownListWrapper>
  );
};

PredictiveInput.defaultProps = dropdownDefaultProps;

export default React.memo(PredictiveInput);
