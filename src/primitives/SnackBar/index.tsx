import React from "react";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import SVG from "primitives/SVG";

import { marginLeft, marginRight, maxWidth } from "libs/styles";

import { SnackBarStyled, stylesMap } from "./styled";

export enum SnackType {
  ERROR = "error",
  SUCCESS = "success",
}

interface SnackBarInterface {
  message: string;
  type: SnackType;
  open: boolean;
  duration?: number;
  close?: () => void;
}
export default ({
  message,
  open,
  type,
  duration = 15000,
  close,
}: SnackBarInterface) => {
  const config = stylesMap[type];

  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => setIsActive(open), [open]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsActive(false);
      close();
    }, duration);
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <SnackBarStyled css={config.styles}>
      <Wrapper>
        <SVG iconName={config.icon} color={config.color} />
      </Wrapper>
      <Wrapper styles={[marginLeft(10), marginRight(10), maxWidth(700)]}>
        <Typography
          tooltipMaxWidth={1300}
          useDotes
          type="regularBody1"
          color={config.color}
        >
          {message}
        </Typography>
      </Wrapper>
      <Wrapper>
        <SVG
          iconName="xCloseSmall"
          color={config.color}
          onClick={() => {
            setIsActive(false);
            close();
          }}
        />
      </Wrapper>
    </SnackBarStyled>
  );
};
