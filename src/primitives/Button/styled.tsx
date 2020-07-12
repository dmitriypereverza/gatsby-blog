import React from "react";
import styled from "styled-components/macro";
import { memoizeWith } from "ramda";

import {
  ai,
  Aligns,
  flex,
  flexGrow,
  fullWidth,
  jc,
  marginLeft,
  marginRight,
} from "libs/styles";

import SVG, { Icons } from "../SVG";

export const getStylesForTextWrapper = memoizeWith(
  ([iconLeft, iconRight, marginWhenNoIcon]) =>
    `${!!iconLeft}${!!iconRight}${marginWhenNoIcon}`,
  ([iconLeft, iconRight, marginWhenNoIcon]) => [
    flex,
    flexGrow(1),
    fullWidth,
    jc(Aligns.CENTER),
    ai(Aligns.CENTER),
    iconLeft
      ? iconRight
        ? null
        : marginRight(4)
      : iconRight
      ? marginLeft(4)
      : [marginLeft(marginWhenNoIcon), marginRight(marginWhenNoIcon)],
  ],
);

export const BaseButtonStyle = styled.button`
  outline: none;
  position: relative;
  padding: 0 8px;
  background-color: transparent;
  cursor: ${(props) => (!props.disabled ? "pointer" : "")};
  height: 40px;
  max-width: 100%;
  transition: all 0.2s;
  & > * {
    max-width: 100%;
    width: 100%;
  }

  min-height: 40px;
  text-align: center;
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
`;

interface RenderIconInterface {
  icon: Icons;
  isLeft: boolean;
  iconStyles?: any;
}

export const RenderIcon = React.memo(function ({
  icon,
  isLeft,
  iconStyles,
}: RenderIconInterface) {
  if (!icon) return null;
  return (
    <SVG
      styles={[isLeft ? marginRight(8) : marginLeft(8), iconStyles]}
      width={24}
      height={24}
      iconName={icon}
    />
  );
});
