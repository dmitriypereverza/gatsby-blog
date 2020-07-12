import React, { ReactNode } from "react";
import { css } from "styled-components/macro";

import Wrapper from "primitives/Wrapper";
import Typography, { TypographyLink } from "primitives/Typography";
import {
  DropdownAligns,
  DropdownItemInterface,
} from "primitives/DropdownMenu/DropdownMenuPopper";
import { Icons } from "primitives/SVG";

import ContentPanel from "components/ContentPanel";

import withPerformance from "libs/decorators/performance/withPerformance";
import {
  backgroundColor,
  borderBottom,
  color,
  flex,
  flexColumn,
  getColor,
  height,
  hover,
  left,
  minHeight,
  padding,
  pointer,
  position,
  right,
  top,
  zIndex,
} from "libs/styles";

const contentPanelCSS = css`
  > button {
    border-radius: 0;
    border-bottom: 1px solid ${getColor("dimmedBlue1")};
    &:last-child {
      border-bottom-color: transparent;
    }
    &:not(.disabled):hover {
      background-color: ${getColor("dimmedBlue0")};
    }

    *:not(.disabled) {
      color: ${getColor("dimmedBlue4")};
    }

    &.disabled * {
      color: ${getColor("dimmedBlue2")};
    }
  }

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export interface DropdownMenu {
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
  setRef?: (element: HTMLDivElement) => void;
}

export const DropdownMenuPanel = withPerformance([
  "style",
  "close",
  "initPopper",
])(
  ({
    items,
    dropdownMenuStyle,
    renderElement,
    close,
    onSelect,
    suggestHeight,
    align = DropdownAligns.LEFT,
    initPopper,
    setRef,
  }: DropdownMenu & {
    close: () => void;
    initPopper: (ref: HTMLDivElement) => void;
  }) => {
    const lastIndex = items.length - 1;
    return (
      <ContentPanel
        styles={[
          contentPanelCSS,
          flex,
          flexColumn,
          padding("4px 0"),
          position("absolute"),
          top("auto"),
          align === DropdownAligns.LEFT ? left(0) : right(0),
          zIndex(1),
          dropdownMenuStyle,
        ]}
        ref={(element: any) => {
          initPopper(element);
          if (setRef) setRef(element);
        }}
      >
        {items.map(({ link, name, disabled, onClick }, key) => (
          <Wrapper
            key={name}
            styles={[
              height(suggestHeight),
              minHeight(suggestHeight),
              !link && padding("10px 12px"),
              lastIndex !== key && borderBottom(1, "dimmedBlue1"),
              !disabled && [
                pointer,
                hover([backgroundColor("dimmedBlue0"), color("dimmedBlue3")]),
              ],
            ]}
            appendProps={{
              onClick: () => {
                if (disabled) return;
                if (!onClick) return;
                close();
                onClick();
                if (onSelect) {
                  onSelect({ name, onClick });
                }
              },
            }}
          >
            {link ? (
              <TypographyLink
                type="regularBody1"
                to={link}
                hoverColor="dimmedBlue4"
                styles={padding("10px 12px")}
              >
                {name}
              </TypographyLink>
            ) : renderElement ? (
              renderElement(name)
            ) : (
              <Typography>{name}</Typography>
            )}
          </Wrapper>
        ))}
      </ContentPanel>
    );
  },
);
