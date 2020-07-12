import React, { ReactNode, useState } from "react";
import styled from "styled-components/macro";
import { Link, LinkProps } from "react-router-dom";

import {
  ai,
  Aligns,
  color,
  Colors,
  display,
  flex,
  fontSize,
  fontWeight,
  getColor,
  lineHeight,
  noWrapText,
  overflow,
  pointer,
  testOverflow,
  textTransform,
} from "libs/styles";

import Tooltip from "../Tooltip";

function getOnlyTypographyProps({
  children,
  className,
  hovercolor,
  onMouseEnter,
  onMouseLeave,
  innerRef,
  onClick,
}) {
  const res = {
    children,
    className,
    hovercolor,
    onMouseEnter,
    onMouseLeave,
    onClick,
  };
  return innerRef ? Object.assign(res, { innerRef }) : res;
}

const TypographyWrapper = styled(
  React.forwardRef((props: any, ref) => (
    <span
      {...getOnlyTypographyProps(props)}
      // @ts-ignore
      ref={ref}
    />
  )),
)`
  display: block;
  ${(props) =>
    props.hovercolor && `:hover { color: ${getColor(props.hovercolor)};}`}
`;

export const TypographyTypes = {
  regularCaps: [
    fontSize(10),
    lineHeight(12),
    textTransform("uppercase"),
    color("dimmedBlue4"),
  ],
  regularCaption: [fontSize(12), lineHeight(16), color("dimmedBlue4")],
  regularBody1: [fontSize(13), lineHeight(20), color("dimmedBlue4")],
  regularBody2: [fontSize(14), lineHeight(20), color("dimmedBlue4")],
  regularHeadLine: [fontSize(18), lineHeight(24), color("dimmedBlue4")],
  regularTitle: [fontSize(24), lineHeight(32), color("dimmedBlue4")],

  mediumCaps: [
    fontSize(10),
    lineHeight(12),
    textTransform("uppercase"),
    color("dimmedBlue4"),
    fontWeight(500),
  ],
  mediumCaption: [
    fontSize(12),
    lineHeight(16),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumBody1: [
    fontSize(13),
    lineHeight(20),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumBody2: [
    fontSize(14),
    lineHeight(20),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumHeadLine: [
    fontSize(18),
    lineHeight(24),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumTitle: [
    fontSize(24),
    lineHeight(32),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumAnalytics: [
    fontSize(32),
    lineHeight(37),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  boldCaps: [
    fontSize(10),
    lineHeight(12),
    fontWeight("bold"),
    textTransform("uppercase"),
    color("dimmedBlue4"),
  ],
  boldCaption: [
    fontSize(12),
    lineHeight(16),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldBody1: [
    fontSize(13),
    lineHeight(20),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldBody2: [
    fontSize(14),
    lineHeight(20),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldHeadLine: [
    fontSize(18),
    lineHeight(24),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldTitle: [
    fontSize(24),
    lineHeight(32),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
};

export interface TypographyInterface {
  className?: string;
  as?:
    | React.FC<
        TypographyInterface & { className: string; children: React.ReactNode }
      >
    | string;
  type?: keyof typeof TypographyTypes;
  color?: Colors;
  tooltipMaxWidth?: number;
  styles?: any[];
  children: ReactNode;
  useDotes?: boolean;
  hoverColor?: Colors;
  onClick?: (e: any) => void;
}

const Typography = ({
  as,
  className,
  styles,
  children,
  tooltipMaxWidth,
  type,
  useDotes,
  hoverColor,
  color: colorProp,
  onClick,
}: TypographyInterface) => {
  const [typoRef, setTypoRef] = useState<HTMLElement>(null);

  const active =
    useDotes && typoRef && typoRef.offsetWidth < typoRef.scrollWidth;

  const render = (setRef: any) => (
    <TypographyWrapper
      onClick={onClick}
      as={as}
      className={className}
      hovercolor={hoverColor}
      ref={(ref) => {
        if (setRef) setRef(ref);
        setTypoRef(ref);
      }}
      css={[
        onClick ? pointer : null,
        flex,
        ai(Aligns.CENTER),
        ...(type ? TypographyTypes[type] : []),
        ...(useDotes
          ? [
              display("block"),
              testOverflow("ellipsis"),
              overflow("hidden"),
              noWrapText,
            ]
          : []),
        colorProp ? color(colorProp) : null,
        styles,
      ]}
    >
      {children}
    </TypographyWrapper>
  );

  if (active)
    return (
      <Tooltip maxWidth={tooltipMaxWidth} text={children}>
        {render}
      </Tooltip>
    );

  return render(null);
};

Typography.defaultProps = {
  styles: [],
  useDotes: false,
  type: "regularBody1",
};

export default React.memo(Typography);

const StyledLink = styled(
  React.forwardRef((props: any, ref) => (
    <Link
      {...getOnlyTypographyProps(props)}
      to={props.to}
      // @ts-ignore
      ref={ref}
    />
  )),
)`
  :hover {
    color: ${(props) => getColor(props.hovercolor || "dimmedBlue3")};
  }
`;

function asLinkTo(
  link: string,
  native = false,
  nativeParams: { download: boolean; target: string },
) {
  return React.forwardRef((data: any, ref: any) => {
    if (native) {
      return (
        <StyledLink
          {...data}
          {...nativeParams}
          href={link}
          as="a"
          ref={(element) => ref && ref(element)}
        />
      );
    }

    return (
      <StyledLink
        {...data}
        to={link}
        innerRef={(element) => ref && ref(element)}
      />
    );
  });
}

export const TypographyLink = React.memo(function (
  props: TypographyInterface &
    LinkProps & { native?: boolean; hoverColor?: Colors },
) {
  return (
    <Typography
      type="mediumBody1"
      useDotes
      {...props}
      // @ts-ignore
      as={asLinkTo(props.to, props.native, {
        download: props.download,
        target: props.target,
      })}
    />
  );
});
