import React from "react";
import styled, { css } from "styled-components/macro";

import { flex, getColor, opacity } from "libs/styles";

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
  background-color: ${getColor("dimmedBlue0")};
  color: ${getColor("dimmedBlue2")};
  fill: ${getColor("dimmedBlue1")};
  border-color: transparent;
`;

const ButtonLineWrapper = styled(BaseButtonStyle)`
  display: flex;
  align-items: center;

  color: ${getColor("dimmedBlue3")};
  fill: ${getColor("dimmedBlue2")};
  border: 1px solid ${getColor("dimmedBlue1")};

  ${(props) => !props.disabled && enabledStyles}
  ${(props) => props.disabled && disabledStyles}
`;

export default styled(
  ({
    className,
    styles,
    outerStyles,
    iconStyles,
    textStyles,
    disabled,
    loading,
    iconLeft,
    iconRight,
    children,
    onClick,
  }) => (
    <ButtonLineWrapper
      className={className}
      css={outerStyles}
      disabled={disabled}
      onClick={onClick}
    >
      <Wrapper styles={[flex, opacity(loading ? "0" : "1"), styles]}>
        <RenderIcon icon={iconLeft} isLeft iconStyles={iconStyles} />
        <Wrapper
          styles={[
            getStylesForTextWrapper([iconLeft, iconRight, 8]),
            textStyles,
          ]}
        >
          {children}
        </Wrapper>
        <RenderIcon icon={iconRight} isLeft={false} iconStyles={iconStyles} />
      </Wrapper>
      <LoadSpinner show={loading} backgroundColor="white" size={6} />
    </ButtonLineWrapper>
  ),
)<{ onClick: () => void }>``;
