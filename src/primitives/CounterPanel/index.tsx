import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Tooltip from "primitives/Tooltip";
import { CounterPanelInterface } from "primitives/CounterPanel/types";

import {
  ai,
  Aligns,
  color,
  flex,
  fullWidth,
  lastChild,
  marginLeft,
  paddingRight,
} from "libs/styles";

export default ({
  outerStyles,
  elementStyles,
  elements,
}: CounterPanelInterface) => {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER), outerStyles]}>
      {elements.map(
        (
          {
            count,
            countStyles,
            iconElementRender,
            textTooltip,
            mouseIn,
            mouseOut,
          },
          index,
        ) => (
          <Tooltip key={index} text={textTooltip}>
            {(setRef) => (
              <Wrapper
                ref={setRef}
                appendProps={{ onMouseEnter: mouseIn, onMouseLeave: mouseOut }}
                styles={[
                  flex,
                  ai(Aligns.CENTER),
                  fullWidth,
                  paddingRight(14),
                  lastChild([paddingRight(0)]),
                  elementStyles,
                ]}
              >
                {iconElementRender()}
                <Typography
                  type={
                    countStyles && countStyles.type
                      ? countStyles.type
                      : "regularBody1"
                  }
                  styles={[
                    marginLeft(6),
                    color("dimmedBlue3"),
                    countStyles && countStyles.styles
                      ? countStyles.styles
                      : null,
                  ]}
                >
                  {count}
                </Typography>
              </Wrapper>
            )}
          </Tooltip>
        ),
      )}
    </Wrapper>
  );
};
