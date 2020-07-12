import React from "react";
import styled from "styled-components/macro";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import SVG from "primitives/SVG";

import {
  ai,
  Aligns,
  color,
  flex,
  fullWidth,
  getColor,
  pointer,
  width,
} from "libs/styles";

import { ChipInterface } from "./types";

const StyledChipComponent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 24px;
  border: 1px solid ${getColor("dimmedBlue1")};
  border-radius: 4px;
`;

interface ChipComponentInterface extends ChipInterface {
  styles?: any;
  editable?: boolean;
  closeChip?: (value: ChipInterface) => void;
  onClick?: (value: ChipInterface) => void;
}

const Chip = ({
  value,
  title,
  editable,
  styles,
  closeChip,
  onClick,
}: ChipComponentInterface) => {
  const chipData: ChipInterface = { value, title };
  return (
    <StyledChipComponent css={[styles, onClick && pointer]}>
      <Wrapper
        appendProps={{
          onClick: () => (onClick ? onClick(chipData) : null),
        }}
        styles={[
          flex,
          ai(Aligns.CENTER),
          editable ? width("calc(100% - 24px)") : fullWidth,
        ]}
      >
        <Typography
          useDotes
          type="regularCaption"
          styles={[color("dimmedBlue3")]}
        >
          {title}
        </Typography>
        <Typography
          useDotes
          type="regularCaption"
          styles={[color("dimmedBlue3")]}
        >
          :&ensp;
        </Typography>
        <Typography
          useDotes
          type="regularCaption"
          styles={[color("dimmedBlue4")]}
        >
          {value}
        </Typography>
      </Wrapper>
      {editable && (
        <SVG
          onClick={() => closeChip(chipData)}
          styles={[pointer]}
          color="dimmedBlue2"
          hoverColor="dimmedBlue3"
          iconName="xCloseSmall"
        />
      )}
    </StyledChipComponent>
  );
};

export default React.memo(Chip);
