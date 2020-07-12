import React, { FC } from "react";
import styled, { css } from "styled-components/macro";

import Wrapper from "primitives/Wrapper";

import { ai, Aligns, flex, fullWidth, getColor, jc } from "libs/styles";

export enum VariantsSkeletonType {
  CIRCLE = "circle",
  RECT = "rect",
  TEXT = "text",
}

interface SkeletonPropsInterface {
  variant: VariantsSkeletonType;
  width: number;
  height: number;
  animation?: boolean;
  outerStyles?: any;
}

const mapSkeletonStyles: {
  [key: string]: any;
} = {
  [VariantsSkeletonType.RECT]: css`
    border-radius: 0;
    border: 1px solid ${getColor("dimmedBlue2")};
  `,
  [VariantsSkeletonType.TEXT]: css`
    width: 100%;
    height: 14px;
    min-width: inherit;
    min-height: inherit;
    border: 0;
    border-radius: 0;
  `,
  [VariantsSkeletonType.CIRCLE]: css`
    border-radius: 50%;
    border: 1px solid ${getColor("dimmedBlue2")};
  `,
};

const keyFramesAnimation = css`
  @keyframes pulseOpacity {
    0% {
      opacity: 20%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const SkeletonTemplateStyled = styled.div`
  min-width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;
  background-color: ${getColor("dimmedBlue1")};
  ${({ variant }) => mapSkeletonStyles[variant]};
  ${({ animation }) =>
    animation &&
    css`
      ${keyFramesAnimation};
      animation-name: pulseOpacity;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: backwards;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    `};
`;

const Skeleton: FC<SkeletonPropsInterface> = React.memo((props) => {
  return (
    <Wrapper
      styles={[
        fullWidth,
        flex,
        jc(Aligns.CENTER),
        ai(Aligns.CENTER),
        props.outerStyles,
      ]}
    >
      <SkeletonTemplateStyled {...props} />
    </Wrapper>
  );
});

Skeleton.defaultProps = {
  animation: false,
};

export default Skeleton;
