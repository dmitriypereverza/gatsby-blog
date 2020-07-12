import React, { ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";

import ClickOutside from "primitives/ClickOutside/ClickOutside";
import Wrapper from "primitives/Wrapper";
import SVG, { Icons } from "primitives/SVG";
import { DropdownMenuPanel } from "primitives/DropdownMenu/DropdownMenuPanel";

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

interface DropdownMenu {
  outerStyles?: any;
  items: DropdownItemInterface[];
  dropdownMenuStyle?: any;
  renderElement?: (name: string) => ReactNode;
  children?: (data: {
    opened;
    toggle: () => void;
    selected?: DropdownItemInterface;
    disabled: boolean;
  }) => JSX.Element;
  icon?: Icons;
  onSelect?: (item: DropdownItemInterface) => void;
  initialValue?: DropdownItemInterface;
  value?: DropdownItemInterface;
  suggestHeight?: number;
  align?: DropdownAligns;
  disabled?: boolean;
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

export default React.memo(function ({
  outerStyles,
  icon = "triplePoint",
  items,
  dropdownMenuStyle,
  renderElement,
  children,
  initialValue,
  value,
  suggestHeight,
  disabled = false,
  align,
}: DropdownMenu) {
  const [opened, open, close] = useBoolean(false);
  const [selected, setSelected] = useState<DropdownItemInterface>(
    initialValue || value,
  );

  useEffect(() => {
    if (!value) return;
    setSelected(value);
  }, [value]);

  const initPopper = usePopper();

  return (
    <ClickOutside handleEnabled={opened} handleClickOut={close}>
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
          <DropdownMenuPanel
            align={align}
            renderElement={renderElement}
            suggestHeight={suggestHeight}
            items={items}
            dropdownMenuStyle={dropdownMenuStyle}
            close={close}
            onSelect={setSelected}
            initPopper={initPopper("child")}
          />
        )}
      </Wrapper>
    </ClickOutside>
  );
});
