import React from "react";
import styled from "styled-components/macro";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import SVG from "primitives/SVG";

import {
  backgroundColor,
  border,
  borderRadius,
  color,
  flex,
  fullWidth,
  height,
  margin,
  marginBottom,
  pointer,
} from "libs/styles";

export const InputWrapper = styled.div`
  display: flex;
  font-size: 13px;
  width: 100%;
`;

export const SelectedItem = styled.div`
  width: 100%;
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export default function (data: {
  styles: any;
  title: string;
  disable: boolean;
  opened: boolean;
  children: JSX.Element;
  setToggle: () => void;
}) {
  return (
    <Wrapper styles={data.styles}>
      {data.title ? (
        <Typography
          useDotes={true}
          type="regularBody1"
          styles={[
            color(data.disable ? "dimmedBlue1" : "dimmedBlue3"),
            marginBottom(8),
          ]}
        >
          {data.title}:
        </Typography>
      ) : null}
      <Wrapper
        styles={[
          flex,
          fullWidth,
          borderRadius(4),
          height(40),
          data.disable
            ? [backgroundColor("dimmedBlue0")]
            : [border(1, "dimmedBlue1"), pointer],
        ]}
      >
        <InputWrapper
          disable={data.disable}
          onClick={() => !data.disable && data.setToggle()}
        >
          <SelectedItem>{data.children}</SelectedItem>
          <SVG
            width={24}
            height={24}
            styles={[margin(8)]}
            color="dimmedBlue2"
            iconName={data.opened ? "arrowUp" : "arrowDown"}
          />
        </InputWrapper>
      </Wrapper>
    </Wrapper>
  );
}
