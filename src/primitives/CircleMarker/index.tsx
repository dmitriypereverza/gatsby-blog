import React, { forwardRef } from "react";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  borderRadius,
  width,
  height,
  pointer,
  minWidth,
  minHeight,
  Colors,
} from "libs/styles";

interface CircleMarkerInterface {
  className?: string;
  color: Colors;
  size?: number;
  onClick?: () => void;
  styles?: any;
}

const CircleMarker = forwardRef(
  (
    { className, color, size = 12, onClick, styles }: CircleMarkerInterface,
    ref,
  ) => (
    <Wrapper
      ref={ref}
      appendProps={{ className, onClick }}
      styles={[
        minHeight(size),
        minWidth(size),
        width(size),
        height(size),
        backgroundColor(color),
        borderRadius("50%"),
        onClick && pointer,
        styles,
      ]}
    />
  ),
);

export default React.memo(CircleMarker);
