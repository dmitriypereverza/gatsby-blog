import React from "react";
import styled from "styled-components/macro";

import { ai, Aligns, flex, getColor, opacity } from "libs/styles";

import Wrapper from "../../Wrapper";
import LoadSpinner from "../../LoadSpinner";
import {
  BaseButtonStyle,
  getStylesForTextWrapper,
  RenderIcon,
} from "../styled";

const ButtonWrapper = styled(BaseButtonStyle)`
  display: flex;
  align-items: center;
  background-color: ${(props) => getColor(props.disabled ? "blue1" : "blue3")};
  color: ${getColor("white")};
  fill: ${getColor("white")};
  :hover {
    background-color: ${(props) => (props.disabled ? "" : getColor("blue35"))};
  }
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
    <ButtonWrapper
      className={className}
      css={outerStyles}
      disabled={disabled}
      onClick={onClick}
    >
      <Wrapper
        styles={[flex, ai(Aligns.CENTER), opacity(loading ? "0" : "1"), styles]}
      >
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
    </ButtonWrapper>
  ),
)<{ onClick: () => void }>``;
