import React from "react";
import styled, { css } from "styled-components/macro";

import { Colors, getColor, pointer, toPixelsProp } from "libs/styles";
import { isString } from "libs/is";

const list = {
  socialTwitter: require("./list/social/twitter.svg"),
  socialFb: require("./list/social/fb.svg"),
  socialVk: require("./list/social/vk.svg"),
};

export type Icons = keyof typeof list;

interface StyledSVGInterface {
  width?: number;
  height?: number;
  css?: any;
  onClick?: any;
  hoverColor?: Colors;
}

interface SVGInterface extends StyledSVGInterface {
  iconName: Icons | Record<string, any>;
  width?: number;
  height?: number;
  viewBox?: string;
  color?: Colors;
  className?: string;
  styles?: any[];
}

const StyledSVG = styled.svg<StyledSVGInterface>`
  display: inline-block;
  min-width: ${toPixelsProp("width")};
  min-height: ${toPixelsProp("height")};

  &:hover {
    use {
      ${({ hoverColor }) => css`
        fill: ${hoverColor ? getColor(hoverColor) : null};
      `};
    }
  }
`;

const SVG = React.forwardRef(function (
  {
    iconName,
    width,
    height,
    styles,
    color,
    className,
    onClick,
    hoverColor,
  }: SVGInterface,
  refProp: any
) {
  if (!iconName || !list[iconName as any]) return null;
  const { symbol, viewBox } = isString(iconName) ? list[iconName] : iconName;
  const [ref, setRef] = React.useState<HTMLElement>(null);

  const fillColor = getColor(color);

  React.useEffect(() => {
    if (!ref) return;
    ref.innerHTML = `<use xlink:href="${symbol}" fill="${fillColor}"/>`;
  }, [ref, iconName, color]);

  return (
    <StyledSVG
      className={[className, "icon"]}
      css={onClick ? [...styles, pointer] : styles}
      hoverColor={hoverColor}
      width={width}
      height={height}
      viewBox={viewBox}
      onClick={onClick}
      ref={(ref) => {
        if (refProp) refProp(ref);
        setRef(ref);
      }}
    >
      <use xlinkHref={symbol} fill={fillColor} />
    </StyledSVG>
  );
});

SVG.defaultProps = {
  styles: [],
  width: 24,
  height: 24,
};

export default React.memo(SVG);
