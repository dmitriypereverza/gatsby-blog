import React, { FC } from "react";
import { omit } from "ramda";

import Wrapper from "primitives/Wrapper";
import Tooltip from "primitives/Tooltip";

function TooltipHOC<T>(Cmp: FC<T>) {
  return (
    props: T & {
      textTooltip: string;
    },
  ) => {
    const { textTooltip } = props;
    const omittedProps = omit(["textTooltip"], props);

    return (
      <Tooltip text={textTooltip} strategy="fixed" maxWidth={350}>
        {(ref) => (
          <Wrapper ref={ref}>
            <Cmp {...((omittedProps as unknown) as T)} />
          </Wrapper>
        )}
      </Tooltip>
    );
  };
}

export default TooltipHOC;
