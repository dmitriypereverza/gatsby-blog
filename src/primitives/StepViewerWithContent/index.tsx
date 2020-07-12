import React, { ReactNode } from "react";

import StepsViewer from "primitives/StepsViewer";
import Wrapper from "primitives/Wrapper";

import { marginBottom } from "libs/styles";

interface StepViewerWithUserInterface {
  steps: {
    render: () => ReactNode;
  }[];
  maxWidth?: number;
  minWidth?: number;
  title: ReactNode;
  wrapperStyles?: any[];
  isOnlyLastStep?: boolean;
}

const StepViewerWithContent = ({
  steps = [],
  maxWidth = 240,
  minWidth = 240,
  title,
  wrapperStyles = [],
  isOnlyLastStep = false,
}: StepViewerWithUserInterface) => (
  <Wrapper styles={[marginBottom(16), wrapperStyles]}>
    {title}
    <StepsViewer
      maxWidth={maxWidth}
      minWidth={minWidth}
      isOnlyLastStep={isOnlyLastStep}
      steps={steps.map((user) => ({
        title: user.render(),
      }))}
    />
  </Wrapper>
);

export default React.memo(StepViewerWithContent);
