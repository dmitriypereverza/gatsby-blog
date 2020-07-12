import { ReactNode } from "react";

import { TypographyTypes } from "primitives/Typography";

export type CountStylesCounterPanelType = {
  type?: keyof typeof TypographyTypes;
  styles?: any[];
};

export interface CounterPanelElementsInterface {
  textTooltip?: ReactNode;
  count?: number;
  countStyles?: CountStylesCounterPanelType;
  iconElementRender: () => ReactNode;
  mouseIn?: () => void;
  mouseOut?: () => void;
}

export interface CounterPanelInterface {
  outerStyles?: any;
  elementStyles?: any;
  elements: CounterPanelElementsInterface[];
}
