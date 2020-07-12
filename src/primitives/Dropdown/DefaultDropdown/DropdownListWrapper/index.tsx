import React, { ReactNode } from "react";
import { Placement } from "@popperjs/core";

import Wrapper from "primitives/Wrapper";
import ClickOutside from "primitives/ClickOutside/ClickOutside";

import {
  flex,
  flexColumn,
  position,
  zIndex,
  inlineFlex,
  fullWidth,
} from "libs/styles";
import usePopper from "libs/usePopper";

import SuggestList from "./SuggestList";

interface DropdownListWrapperInterface<T> {
  opened: boolean;
  renderOnRight?: boolean;
  suggests: T[];
  elementsFullHeight: number;
  suggestHeight: number;
  suggestWidth: string | number;
  defaultElements?: T[];
  styles?: any;
  placement?: Placement;
  children: (isOpen: boolean, setOpen: (isOpen?: boolean) => void) => ReactNode;
  renderSuggest: (suggest: T, key: number) => JSX.Element;
  setOpen: (opened?: boolean) => void;
  emptySuggestElement?: ReactNode;
  suggestsLoading?: boolean;
}

function DropdownListWrapper<T>({
  opened,
  children,
  suggests,
  elementsFullHeight,
  suggestHeight,
  suggestWidth,
  defaultElements = [],
  styles,
  placement,
  renderSuggest,
  setOpen,
  emptySuggestElement,
  suggestsLoading,
}: DropdownListWrapperInterface<T>) {
  const closeDropdown = () => setOpen(false);

  const initPopper = usePopper({ placement });

  return (
    <ClickOutside handleEnabled={opened} handleClickOut={closeDropdown}>
      <Wrapper
        styles={[inlineFlex, flexColumn, position("relative"), styles]}
        ref={initPopper("parent")}
      >
        {children(opened, setOpen)}
        {opened && (
          <Wrapper
            styles={[zIndex(5), flex, fullWidth]}
            ref={initPopper("child")}
          >
            <SuggestList
              elementsFullHeight={elementsFullHeight}
              suggestHeight={suggestHeight}
              suggestWidth={suggestWidth}
              suggests={[...defaultElements, ...suggests]}
              renderSuggest={renderSuggest}
              emptySuggestElement={emptySuggestElement}
              suggestsLoading={suggestsLoading}
            />
          </Wrapper>
        )}
      </Wrapper>
    </ClickOutside>
  );
}

export default React.memo(DropdownListWrapper) as <T>(
  props: DropdownListWrapperInterface<T>,
) => JSX.Element;
