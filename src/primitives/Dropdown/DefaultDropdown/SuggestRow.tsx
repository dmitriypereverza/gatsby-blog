import React, { ReactNode } from "react";
import styled from "styled-components/macro";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  Aligns,
  capitalizeFirstLetter,
  flex,
  fullWidth,
  getColor,
  jc,
  overflow,
  padding,
  paddingLeft,
  pointer,
} from "libs/styles";

export const SuggestRowWrapper = styled.div`
  display: flex;
  ${(props) =>
    props.active ? "background-color: " + getColor("dimmedBlue0") : ""};
  &:hover {
    background-color: ${getColor("dimmedBlue0")};
  }

  border-bottom: 1px solid ${getColor("dimmedBlue1")};
  &:last-child {
    border-bottom: none;
    padding-bottom: 1px;
  }
`;

export default React.memo(
  ({
    title,
    render,
    styles,
    selected,
    onSelect,
  }: {
    title: string;
    render?: ReactNode;
    selected: boolean;
    styles?: any;
    onSelect: () => void;
  }) => {
    return (
      <SuggestRowWrapper active={selected} onClick={onSelect}>
        <Wrapper
          styles={[
            fullWidth,
            pointer,
            overflow("hidden"),
            padding(10),
            paddingLeft(12),
            flex,
            jc(Aligns.SPACE_BETWEEN),
            styles,
          ]}
        >
          {render ? (
            render
          ) : (
            <Wrapper styles={[overflow("auto")]}>
              <Typography
                useDotes
                type="regularBody1"
                styles={[capitalizeFirstLetter, padding("3px 0")]}
              >
                {title}
              </Typography>
            </Wrapper>
          )}
        </Wrapper>
      </SuggestRowWrapper>
    );
  },
);
