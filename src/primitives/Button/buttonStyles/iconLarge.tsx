import React from "react";
import styled from "styled-components/macro";

import { ai, Aligns, flex, getColor, opacity } from "libs/styles";

import Wrapper from "../../Wrapper";
import SVG from "../../SVG";
import LoadSpinner from "../../LoadSpinner";
import { BaseButtonStyle } from "../styled";
import { disabledStyles, enabledStyles } from "./iconSmall";

const ButtonOnlyIconWrapper = styled(BaseButtonStyle)`
  display: flex;
  align-items: center;
  fill: ${getColor("dimmedBlue2")};
  border: 1px solid ${getColor("dimmedBlue1")};
  ${(props) => (props.disabled ? disabledStyles : enabledStyles)}
`;

export default styled(
  ({
    className,
    styles,
    outerStyles,
    iconStyles,
    loading,
    iconLeft,
    onClick,
  }) => (
    <ButtonOnlyIconWrapper
      className={className}
      css={outerStyles}
      onClick={onClick}
    >
      <Wrapper
        styles={[flex, opacity(loading ? "0" : "1"), ai(Aligns.CENTER), styles]}
      >
        <SVG styles={[iconStyles]} width={24} height={24} iconName={iconLeft} />
      </Wrapper>
      <LoadSpinner show={loading} />
    </ButtonOnlyIconWrapper>
  ),
)``;
