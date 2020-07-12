import styled from "styled-components/macro";
import React from "react";

import { Icons } from "primitives/SVG";

import { backgroundColor, Colors, getColor } from "libs/styles";

export interface ConfigErrorStyledInterface {
  [key: string]: {
    styles: any[];
    icon: Icons;
    color: Colors;
  };
}
export const stylesMap: ConfigErrorStyledInterface = {
  success: {
    styles: [backgroundColor("blue3")],
    icon: "success",
    color: getColor("blue0"),
  },
  error: {
    styles: [backgroundColor("#FDD")],
    icon: "warn",
    color: getColor("red"),
  },
};

export const SnackBarInnerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const SnackBarStyled = ({ css, children }) => {
  return <SnackBarInnerStyled css={css}>{children}</SnackBarInnerStyled>;
};
