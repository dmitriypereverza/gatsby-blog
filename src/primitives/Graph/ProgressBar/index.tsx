import React from "react";
import styled, { css } from "styled-components/macro";
import { prop, isNil } from "ramda";

import Tooltip from "primitives/Tooltip";

import { Colors, getColor } from "libs/styles";
import { isNotNil } from "libs/libs";

const StyledProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  overflow: hidden;
`;

const stylesForLeftAlign = css`
  border-radius: 2px 0 0 2px;
  left: 0;
`;

const stylesForRightAlign = css`
  border-radius: 0 2px 2px 0;
  right: 0;
`;

const StyledProgressBarRow = styled.div<{
  color?: Colors;
  width: string | number;
  align: "left" | "right";
}>`
  background-color: ${(props) => getColor(props.color || "dimmedBlue1")};
  position: absolute;
  ${(props) =>
    props.align === "left" ? stylesForLeftAlign : stylesForRightAlign};
  top: 0;
  height: 100%;
  width: ${(props) => (props.width || "0") + "%"};
`;

export interface ProgressBarRow {
  color: Colors;
  align?: "left" | "right";
  tooltip?: string;
  size: number;
}

interface ProgressBarInterface {
  styles?: any;
  configBars: ProgressBarRow[];
  maxSize?: number;
}

const ProgressBar = React.forwardRef(
  (
    { configBars, styles, maxSize }: ProgressBarInterface,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const [calculatedMaxSize, setCalculatedMaxSize] = React.useState(0);

    React.useEffect(() => {
      setCalculatedMaxSize(
        isNotNil(maxSize) ? maxSize : Math.max(...configBars.map(prop("size"))),
      );
    }, [maxSize]);

    return (
      <StyledProgressBarWrapper css={styles} ref={ref}>
        {calculatedMaxSize
          ? configBars.map((bar, index) => (
              <Tooltip key={index} text={bar.tooltip}>
                {(setRef) => (
                  <StyledProgressBarRow
                    ref={setRef}
                    align={isNil(bar.align) ? "left" : bar.align}
                    width={(bar.size * 100) / calculatedMaxSize}
                    color={bar.color}
                  />
                )}
              </Tooltip>
            ))
          : null}
      </StyledProgressBarWrapper>
    );
  },
);

export default React.memo(ProgressBar);
