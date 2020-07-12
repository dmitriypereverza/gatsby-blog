import React from "react";
import styled from "styled-components/macro";

import Typography from "primitives/Typography";

import { getColor, lineHeight, marginLeft, padding } from "libs/styles";

const StyledSmallDotIndicator = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: ${getColor("orange")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  right: -4px;
  top: 0;
  border: 1px solid white;
`;

interface SmallDotIndicatorInterface {
  number?: number;
  styles?: any;
}
const SmallDotIndicator = ({ number, styles }: SmallDotIndicatorInterface) => {
  return (
    <StyledSmallDotIndicator css={styles}>
      {number ? (
        <Typography
          color="white"
          type="boldCaps"
          styles={[padding(0), lineHeight(9), marginLeft(1)]}
        >
          {Math.min(number, 99)}
        </Typography>
      ) : null}
    </StyledSmallDotIndicator>
  );
};

export default React.memo(SmallDotIndicator);
