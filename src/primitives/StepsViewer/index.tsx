import React from "react";
import styled from "styled-components/macro";

import Typography, { TypographyLink } from "primitives/Typography";

import {
  getColor,
  hoverColor,
  marginRight,
  maxWidth,
  minWidth,
  padding,
  pointer,
} from "libs/styles";
import { isString } from "libs/is";

const arrowRight = require("./arrow_right.svg");
const arrowLeft = require("./arrow_left.svg");

const StepsWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 56px;
  max-height: 56px;
  background: ${getColor("blue0")};
  position: relative;
  margin-right: 16px;
  border-radius: 4px 0 0 4px;
  padding: 8px 12px;

  ${(props) => !props.firstStep && "margin-left: 16px;"};
  ${(props) =>
    props.lastStep &&
    `border-radius: 0 4px 4px 0; padding: 8px 12px 8px 8px;`} :after,: before{
    position: absolute;
    top: 0;
    width: 16px;
    height: 56px;
  }

  :after {
    ${(props) => !props.lastStep && `content: "";`};
    right: -16px;
    background: url(${arrowRight.view});
  }

  :before {
    ${(props) => !props.firstStep && `content: "";`};
    left: -15px;
    background: url(${arrowLeft.view});
  }
`;

const IconPlace = styled.div`
  position: absolute;
  top: 6px;
  right: ${(props) => (props.birRightPadding ? 8 : 2)}px;
`;

export interface StepViewerItemInterface {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  subtitleLink?: string;
  onClick?: () => void;
  render?: () => React.ReactNode;
}

interface StepsViewerInterface {
  maxWidth?: string | number;
  minWidth?: string | number;
  steps: StepViewerItemInterface[];
  isOnlyLastStep?: boolean;
}

const StepsViewer = ({
  steps,
  maxWidth: maxWidthProp = 200,
  minWidth: minWidthProp = 200,
  isOnlyLastStep = false,
}: StepsViewerInterface) => {
  const notEmptySteps = steps.filter(Boolean);
  const stepsCountOverOne = notEmptySteps.length !== 1;
  return (
    <StepsWrapper>
      {notEmptySteps.map(
        ({ icon, title, subtitle, subtitleLink, onClick, render }, index) => {
          const isLastStep =
            notEmptySteps.length - 1 === index && stepsCountOverOne;

          return render ? (
            <div key={index}>{render()}</div>
          ) : (
            <Step
              key={index}
              css={[
                maxWidth(maxWidthProp),
                minWidth(minWidthProp),
                isOnlyLastStep ? padding("8px 12px") : null,
              ]}
              firstStep={index === 0}
              lastStep={isOnlyLastStep ? isOnlyLastStep : isLastStep}
            >
              {icon && (
                <IconPlace
                  birRightPadding={isOnlyLastStep ? isOnlyLastStep : isLastStep}
                >
                  {icon}
                </IconPlace>
              )}
              {title &&
                (isString(title) ? (
                  <Typography
                    useDotes
                    type="mediumBody1"
                    color="dimmedBlue3"
                    styles={[icon && marginRight(16)]}
                  >
                    {title}
                  </Typography>
                ) : (
                  title
                ))}
              {subtitle &&
                (subtitleLink ? (
                  <TypographyLink to={subtitleLink} type="mediumBody1">
                    {subtitle}
                  </TypographyLink>
                ) : isString(subtitle) ? (
                  <Typography
                    type="mediumBody1"
                    useDotes
                    styles={onClick && [pointer, hoverColor("dimmedBlue3")]}
                    onClick={onClick}
                  >
                    {subtitle}
                  </Typography>
                ) : (
                  subtitle
                ))}
            </Step>
          );
        },
      )}
    </StepsWrapper>
  );
};

export default React.memo(StepsViewer);
