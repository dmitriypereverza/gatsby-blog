import React from "react";
import styled, { css } from "styled-components/macro";

import { ai, Aligns, flex, getColor, opacity } from "libs/styles";

import Wrapper from "../../Wrapper";
import LoadSpinner from "../../LoadSpinner";
import {
  BaseButtonStyle,
  getStylesForTextWrapper,
  RenderIcon,
} from "../styled";

const enabledStyles = css`
  :hover {
    background-color: ${getColor("dimmedBlue1")};
    color: ${getColor("dimmedBlue3")};
    fill: ${getColor("dimmedBlue2")};
  }
`;

const disabledStyles = css`
  background-color: transparent;
  color: ${getColor("dimmedBlue1")};
  fill: ${getColor("dimmedBlue1")};
  border-color: transparent;
`;

const ButtonLinkWrapper = styled(BaseButtonStyle)`
  display: flex;
  align-items: center;

  * {
    color: ${getColor("dimmedBlue3")};
    fill: ${getColor("dimmedBlue2")};
  }

  ${(props) => !props.disabled && enabledStyles};
  ${(props) => props.disabled && disabledStyles};
`;

export default styled(
  ({
    className,
    styles,
    disabled,
    outerStyles,
    iconStyles,
    textStyles,
    loading,
    iconLeft,
    iconRight,
    children,
    onClick,
  }) => (
    <ButtonLinkWrapper
      className={className}
      disabled={disabled}
      css={outerStyles}
      onClick={onClick}
    >
      <Wrapper
        styles={[flex, opacity(loading ? "0" : "1"), ai(Aligns.CENTER), styles]}
      >
        <RenderIcon icon={iconLeft} isLeft iconStyles={iconStyles} />
        <Wrapper
          styles={[
            getStylesForTextWrapper([iconLeft, iconRight, 0]),
            textStyles,
          ]}
        >
          {children}
        </Wrapper>
        <RenderIcon icon={iconRight} isLeft={false} iconStyles={iconStyles} />
      </Wrapper>
      <LoadSpinner show={loading} />
    </ButtonLinkWrapper>
  ),
)``;
