import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { css } from "styled-components";

import { Colors, getColor } from "libs/styles";

const scaleKeyframes = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const spinAnimationKeyframes = keyframes`
  0%,
    39%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
`;

const loaderCommonStyles = css`
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TriplePointLoader = styled.div`
  ${loaderCommonStyles};
  > div {
    margin-left: 3px;
    background-color: ${(props) =>
      props.backgroundColor ? getColor(props.backgroundColor) : "white"};

    width: ${(props) => (props.size ? props.size : 6)}px;
    height: ${(props) => (props.size ? props.size : 6)}px;
    flex: 1;
    border-radius: 100%;
    display: inline-block;
    animation: ${scaleKeyframes} 1.4s infinite ease-in-out both;

    :nth-child(1) {
      animation-delay: -0.16s;
    }
    :nth-child(2) {
      animation-delay: -0.32s;
    }
  }
`;

const SpinnerLoader = styled.div`
  ${loaderCommonStyles};
  width: 32px;
  height: 32px;

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    &:before {
      content: "";
      display: block;
      margin: 0 auto;
      width: ${(props) => (props.size ? props.size : 5)}px;
      height: ${(props) => (props.size ? props.size : 5)}px;
      background-color: ${(props) =>
        props.backgroundColor ? getColor(props.backgroundColor) : "white"};
      border-radius: 100%;
      animation: ${spinAnimationKeyframes} 1.2s infinite ease-in-out both;
    }
  }

  div:nth-child(2) {
    transform: rotate(30deg);
    &:before {
      animation-delay: -1.1s;
    }
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    &:before {
      animation-delay: -1s;
    }
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    &:before {
      animation-delay: -0.9s;
    }
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    &:before {
      animation-delay: -0.8s;
    }
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    &:before {
      animation-delay: -0.7s;
    }
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    &:before {
      animation-delay: -0.6s;
    }
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    &:before {
      animation-delay: -0.5s;
    }
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    &:before {
      animation-delay: -0.4s;
    }
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    &:before {
      animation-delay: -0.3s;
    }
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    &:before {
      animation-delay: -0.2s;
    }
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    &:before {
      animation-delay: -0.1s;
    }
  }
`;

interface LoaderInterface {
  show: boolean;
  backgroundColor?: Colors;
  useSpinner?: boolean;
  size?: number;
}

export const StyledLoader = React.memo((props: LoaderInterface) => {
  if (!props.show) return null;
  return (
    <div>
      {props.useSpinner ? (
        <SpinnerLoader {...props}>
          {new Array(12).fill(true).map((_, key) => (
            <div key={key} />
          ))}
        </SpinnerLoader>
      ) : (
        <TriplePointLoader {...props}>
          {new Array(3).fill(true).map((_, key) => (
            <div key={key} />
          ))}
        </TriplePointLoader>
      )}
    </div>
  );
});

export default StyledLoader;
