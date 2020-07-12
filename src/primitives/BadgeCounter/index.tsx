import React from "react";
import styled from "styled-components";

import {
  absoluteCenterByHorizontal,
  backgroundColor,
  color,
} from "libs/styles";

import Typography from "../Typography";

export const BadgeContainerCounter = styled.div`
  ${absoluteCenterByHorizontal};
  bottom: -4px;
  z-index: 15;
`;

const BaseCircle = styled.div`
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigStyledCircle = styled(BaseCircle)`
  min-width: 28px;
  max-width: 28px;
  max-height: 20px;
  min-height: 20px;
  ${(props) => props.css}
`;

const SmallStyledCircle = styled(BaseCircle)`
  width: 24px;
  height: 16px;
  ${(props) => props.css}
`;

export interface BadgeCounterInterface {
  value: number;
  active?: boolean;
  isBig?: boolean;
  styles?: any[];
}

const states = {
  normal: {
    fontStyles: [color("dimmedBlue2")],
    styles: [backgroundColor("dimmedBlue1")],
  },
  active: {
    fontStyles: [color("white")],
    styles: [backgroundColor("blue3")],
  },
};

function BadgeCounterComponent(props: BadgeCounterInterface) {
  const { value, active, isBig, styles } = props;
  const stateStyles = active ? states.active : states.normal;
  const Cmp = isBig ? BigStyledCircle : SmallStyledCircle;

  return (
    <Cmp css={[...stateStyles.styles, ...styles]}>
      <Typography
        type={isBig ? "boldCaption" : "boldCaps"}
        styles={stateStyles.fontStyles}
      >
        {value}
      </Typography>
    </Cmp>
  );
}

BadgeCounterComponent.defaultProps = {
  active: false,
  isBig: false,
  styles: [],
};

export default React.memo(BadgeCounterComponent);
