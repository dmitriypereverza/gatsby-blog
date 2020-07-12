import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";
import { Placement } from "@popperjs/core";

import ClickOutside from "primitives/ClickOutside/ClickOutside";
import Wrapper from "primitives/Wrapper";
import SVG from "primitives/SVG";
import {
  DropdownMenu,
  DropdownMenuPanel,
} from "primitives/DropdownMenu/DropdownMenuPanel";
import { TransformToAbsolute } from "primitives/DropdownMenu/TransformToAbsolute";

import { useBoolean } from "libs/hooks";
import { getColor, position } from "libs/styles";
import usePopper from "libs/usePopper";

export interface DropdownItemInterface {
  name: string;
  onClick?: () => void;
  link?: string;
  disabled?: boolean;
}

export enum DropdownAligns {
  LEFT,
  RIGHT,
}

const TriplePointButton = styled.button`
  height: 24px;
  width: 38px;
  outline: none;
  cursor: pointer;
  padding-top: 0;
  padding-bottom: 0;
  fill: ${getColor("dimmedBlue2")};
  :hover {
    fill: ${getColor("dimmedBlue3")};
  }
  background-color: transparent;
  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      color: ${getColor("dimmedBlue2")};
      &:hover {
        color: ${getColor("dimmedBlue2")};
        fill: ${getColor("dimmedBlue2")};
      }
    `};
`;

interface DropdownMenuPopperInterface extends DropdownMenu {
  placement?: Placement;
}
export default React.memo(function ({
  outerStyles,
  icon = "triplePoint",
  dropdownMenuStyle,
  renderElement,
  children,
  initialValue,
  value,
  suggestHeight,
  disabled = false,
  align,
  placement,
  items,
}: DropdownMenuPopperInterface) {
  const [opened, open, close] = useBoolean(false);
  const [selected, setSelected] = useState<DropdownItemInterface>(
    initialValue || value,
  );

  useEffect(() => {
    if (!value) return;
    setSelected(value);
  }, [value]);

  const initPopper = usePopper({
    placement: placement || "bottom-end",
  });

  const WrapperRef = useRef<HTMLElement>();

  return (
    <ClickOutside
      handleEnabled={opened}
      handleClickOut={close}
      refs={[WrapperRef]}
    >
      <Wrapper
        styles={[position("relative"), outerStyles]}
        ref={initPopper("parent")}
      >
        {children ? (
          children({
            toggle: opened ? close : open,
            opened,
            selected,
            disabled,
          })
        ) : (
          <TriplePointButton
            disabled={disabled}
            onClick={opened ? close : open}
          >
            <SVG iconName={icon} width={24} height={24} />
          </TriplePointButton>
        )}
        {opened && (
          <TransformToAbsolute selector="#dropdown-root">
            {() => (
              <DropdownMenuPanel
                align={align}
                renderElement={renderElement}
                suggestHeight={suggestHeight}
                items={items}
                dropdownMenuStyle={dropdownMenuStyle}
                close={close}
                onSelect={setSelected}
                initPopper={initPopper("child")}
                setRef={(element) => {
                  WrapperRef.current = element;
                }}
              />
            )}
          </TransformToAbsolute>
        )}
      </Wrapper>
    </ClickOutside>
  );
});
