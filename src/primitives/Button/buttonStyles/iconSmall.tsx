import React from "react";
import styled, { css } from "styled-components/macro";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import SVG from "primitives/SVG";
import LoadSpinner from "primitives/LoadSpinner";

import {
  ai,
  Aligns,
  color,
  flex,
  getColor,
  opacity,
  paddingLeft,
  paddingRight,
  pointer,
} from "libs/styles";

import { BaseButtonStyle } from "../styled";

export const enabledStyles = css`
  :hover {
    fill: ${getColor("dimmedBlue3")};
  }
`;

export const disabledStyles = css`
  fill: ${getColor("dimmedBlue1")};
`;

const ButtonOnlyIconWrapper = styled(BaseButtonStyle)`
  display: flex;
  align-items: center;
  padding: 0;
  height: 26px;
  min-height: 26px;
  fill: ${getColor("dimmedBlue2")};

  ${(props) => (props.disabled ? disabledStyles : enabledStyles)}
`;

export default styled(
  ({
    className,
    styles,
    outerStyles,
    textStyles,
    iconStyles,
    disabled,
    loading,
    iconLeft,
    iconRight,
    children,
    onClick,
  }) => {
    const icon = (
      <ButtonOnlyIconWrapper
        className={className}
        css={outerStyles}
        disabled={disabled}
        onClick={onClick}
      >
        <Wrapper
          styles={[
            flex,
            opacity(loading ? "0" : "1"),
            ai(Aligns.CENTER),
            styles,
          ]}
        >
          <SVG
            styles={[iconStyles]}
            width={24}
            height={24}
            iconName={iconLeft || iconRight}
          />
        </Wrapper>
        <LoadSpinner show={loading} />
      </ButtonOnlyIconWrapper>
    );

    return (
      <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
        {iconLeft && icon}
        {children && (
          <Typography
            styles={[
              iconLeft ? paddingLeft(8) : paddingRight(8),
              color("dimmedBlue3"),
              pointer,
              textStyles,
            ]}
            onClick={onClick}
          >
            {children}
          </Typography>
        )}
        {iconRight && icon}
      </Wrapper>
    );
  },
)``;
