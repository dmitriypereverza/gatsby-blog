import React, { useEffect } from "react";
import styled, { css } from "styled-components/macro";

import {
  ai,
  Aligns,
  flex,
  getColor,
  marginLeft,
  marginRight,
  padding,
  paddingTop,
  pointer,
} from "libs/styles";
import { useToggle } from "libs/hooks";
import { isString } from "libs/is";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import SVG from "../SVG";

const StyledCheckBox = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 3px;
`;

const checkBoxUnselectedEnabled = css`
  background-color: ${getColor("dimmedBlue2")};
  &:hover {
    background-color: ${getColor("dimmedBlue3")};
  }
`;
const checkBoxUnselectedDisabled = css`
  background-color: ${getColor("dimmedBlue1")};
`;

const CheckBoxUnselected = styled(({ className }) => (
  <Wrapper styles={padding(2)}>
    <StyledCheckBox className={className} />
  </Wrapper>
))`
  ${(props) =>
    props.disabled ? checkBoxUnselectedDisabled : checkBoxUnselectedEnabled}
`;

const checkBoxSelectedEnabled = css`
  background-color: ${getColor("blue3")};
  &:hover {
    background-color: ${getColor("blue35")};
  }
`;
const checkBoxSelectedDisabled = css`
  background-color: ${getColor("blue1")};
`;

const StyledCheckBoxActive = styled(StyledCheckBox)`
  display: flex;
  justify-content: center;
  align-self: center;
  ${(props) =>
    props.disabled ? checkBoxSelectedDisabled : checkBoxSelectedEnabled}
`;

const CheckBoxSelected = ({ disabled }: { disabled: boolean }) => (
  <Wrapper styles={padding(2)}>
    <StyledCheckBoxActive disabled={disabled}>
      <SVG width={20} height={20} iconName="editSuccess" color="white" />
    </StyledCheckBoxActive>
  </Wrapper>
);

interface CheckboxInterface {
  onLeft?: boolean;
  styles?: any;
  selected: boolean;
  disabled?: boolean;
  title?: string | JSX.Element;
  onChange?: (newSelected: boolean) => void;
  optimisticUpdate?: boolean;
}

export default React.memo(
  ({
    styles,
    onLeft,
    selected,
    title,
    disabled,
    onChange,
    optimisticUpdate,
  }: CheckboxInterface) => {
    const [isEnable, toggle] = useToggle(selected);
    useEffect(() => {
      if (selected !== isEnable) {
        toggle(selected);
      }
    }, [selected]);

    const checkbox = isEnable ? (
      <CheckBoxSelected disabled={disabled} />
    ) : (
      <CheckBoxUnselected disabled={disabled} />
    );
    return (
      <Wrapper
        styles={[flex, !disabled && pointer, styles]}
        appendProps={{
          onClick: () => {
            if (optimisticUpdate) {
              toggle();
            }
            onChange && !disabled && onChange(!isEnable);
          },
        }}
      >
        {onLeft && checkbox}
        {title &&
          (isString(title) ? (
            <Typography
              useDotes
              styles={[
                onLeft ? marginLeft(8) : marginRight(8),
                ai(Aligns.CENTER),
                paddingTop(2),
              ]}
              type="regularBody1"
              color="dimmedBlue3"
            >
              {title}
            </Typography>
          ) : (
            title
          ))}
        {!onLeft && checkbox}
      </Wrapper>
    );
  },
);
