import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components/macro";

import SVG from "primitives/SVG";
import BadgeCounterComponent from "primitives/BadgeCounter";

import {
  borderBottom,
  borderNone,
  color,
  Colors,
  flex,
  flexColumn,
  getColor,
  hover,
  hoverColor,
  lastChild,
  left,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingBottom,
  paddingTop,
  position,
  right,
  top,
  transition,
} from "libs/styles";
import withRouter from "libs/decorators/withRouter";
import { isNotNil } from "libs/libs";

import Typography, { TypographyTypes } from "../Typography";
import HorizontalScrollComponent from "./HorizontalScroll";

export enum Orientations {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export enum TabThemes {
  Default = "default",
  Gray = "gray",
}

const applyBorder = (color: Colors) => borderBottom(2, color);

const tabThemeMap = {
  [TabThemes.Default]: {
    active: [],
    inactive: [hover([color("dimmedBlue4")], " > span")],
    activeText: [color("blue3")],
  },
  [TabThemes.Gray]: {
    active: [applyBorder("dimmedBlue4")],
    inactive: [],
    activeText: [color("dimmedBlue4")],
  },
};

const orientationStyleMap = {
  [Orientations.Vertical]: {
    outerScrollerStyles: [padding(0)],
    tabsWrapperStyles: [flexColumn],
    tabStyle: [
      marginBottom(20),
      lastChild([marginBottom(0)]),
      hoverColor("dimmedBlue4"),
    ],
    activeTabStyles: [borderNone, hoverColor("blue3")],
    inactiveTabStyles: [],
  },
  [Orientations.Horizontal]: {
    outerScrollerStyles: [],
    tabsWrapperStyles: [],
    tabStyle: [
      marginRight(24),
      lastChild([marginRight(0)]),
      paddingBottom(16),
      paddingTop(20),
    ],
    activeTabStyles: [borderBottom(2, "blue3")],
    inactiveTabStyles: [
      applyBorder("transparent"),
      hover(applyBorder("dimmedBlue2")),
    ],
  },
};

const Tab = styled.div`
  transition: border-bottom-color 0.2s;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `cursor: default; span { color: ${getColor("dimmedBlue2")} !important; }`}
`;

const StyledTabsWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

export interface TabInterface {
  title: string;
  code: string;
  counter?: number;
  disabled?: boolean;
}

interface TabsInterface extends RouteComponentProps {
  items: TabInterface[];
  asLinks?: boolean;
  styles?: any;
  outerStyles?: any;
  tabStyles?: any;
  font?: keyof typeof TypographyTypes;
  currentTab?: string;
  disableScroll?: boolean;
  orientation?: Orientations;
  canClosing?: boolean;
  theme?: TabThemes;
  onChange: (data: string) => void;
}

const TabsComponent = withRouter(
  ({
    styles = [],
    outerStyles,
    disableScroll,
    orientation = Orientations.Horizontal,
    tabStyles,
    items,
    currentTab,
    font = "boldCaps",
    onChange,
    asLinks,
    history,
    theme = TabThemes.Default,
    canClosing = false,
  }: TabsInterface) => {
    const selectTab = (tabCode) => {
      if (canClosing && currentTab === tabCode) {
        onChange(null);
        return;
      }
      onChange(tabCode);
    };

    const tabTheme = tabThemeMap[theme];

    const tabs = items.map(({ disabled, title, code, counter }) => {
      const active = currentTab === code;
      return (
        <Tab
          key={code}
          css={[
            flex,
            tabStyles,
            orientationStyleMap[orientation].tabStyle,
            active
              ? [
                  orientationStyleMap[orientation].activeTabStyles,
                  tabTheme.active,
                ]
              : !disabled && [
                  orientationStyleMap[orientation].inactiveTabStyles,
                  tabTheme.inactive,
                ],
          ]}
          disabled={disabled}
          onClick={() => {
            if (disabled) {
              return null;
            }
            if (asLinks) {
              history.push("?tab=" + code);
            }
            selectTab(code);
          }}
        >
          <Typography
            type={font}
            styles={[
              color("dimmedBlue3"),
              transition("color 0.2s"),
              active && tabTheme.activeText,
            ]}
          >
            {title}
          </Typography>
          {isNotNil(counter) ? (
            <BadgeCounterComponent
              active={active}
              styles={[marginLeft(4)]}
              value={counter}
            />
          ) : null}
        </Tab>
      );
    });

    return (
      <HorizontalScrollComponent
        disabled={disableScroll}
        styles={[
          orientationStyleMap[orientation].outerScrollerStyles,
          outerStyles,
        ]}
        renderIconLeft={(scrollLeft) => (
          <SVG
            iconName="arrowLeft"
            color="dimmedBlue2"
            hoverColor="dimmedBlue3"
            onClick={scrollLeft}
            styles={[borderNone, position("absolute"), left(0), top(14)]}
          />
        )}
        renderIconRight={(scrollRight) => (
          <SVG
            iconName="arrowRight"
            color="dimmedBlue2"
            hoverColor="dimmedBlue3"
            onClick={scrollRight}
            styles={[borderNone, position("absolute"), right(0), top(14)]}
          />
        )}
      >
        <StyledTabsWrapper
          css={[styles, orientationStyleMap[orientation].tabsWrapperStyles]}
        >
          {tabs}
        </StyledTabsWrapper>
      </HorizontalScrollComponent>
    );
  },
);

export default React.memo(TabsComponent);
