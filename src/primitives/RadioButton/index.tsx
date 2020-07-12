import React, { useState } from "react";
import styled from "styled-components/macro";

import {
  ai,
  Aligns,
  flex,
  getColor,
  marginLeft,
  marginTop,
  pointer,
} from "libs/styles";
import { isString } from "libs/is";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { Orientations } from "../Checkbox/CheckboxGroup";

const StyledRadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === Orientations.Vertical ? "column" : "row"};
`;

const StyledRadio = styled.div`
  height: 24px;
  min-height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
`;

const StyledRadioDisabled = styled(StyledRadio)`
  background-color: ${getColor("dimmedBlue2")};

  &:hover {
    background-color: ${getColor("dimmedBlue3")};
  }
`;

const StyledRadioActive = styled(StyledRadio)`
  background-color: ${getColor("blue3")};
  position: relative;

  &:hover {
    background-color: ${getColor("blue35")};
  }
`;
const WhiteCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 8px;
  width: 8px;
  background-color: white;
`;
const RadioActive = () => (
  <StyledRadioActive>
    <WhiteCircle />
  </StyledRadioActive>
);

interface CasesInterface {
  title: string | JSX.Element;
  data: any;
}

interface RadioButtonInterface {
  styles?: any;
  orientation?: Orientations;
  selected?: CasesInterface;
  cases: CasesInterface[];
  onSelect: (data: CasesInterface) => void;
}

const RadioButton = ({
  styles,
  orientation,
  cases,
  selected,
  onSelect,
}: RadioButtonInterface) => {
  const [selectedValue, setValue] = useState(selected);

  const change = (item: CasesInterface) => {
    setValue(item);
    onSelect(item);
  };

  return (
    <StyledRadioButtonWrapper css={styles} orientation={orientation}>
      {cases.map((caseItem, index) => (
        <Wrapper
          key={index}
          styles={[
            flex,
            index !== 0 && marginTop(12),
            pointer,
            ai(Aligns.CENTER),
          ]}
          appendProps={{ onClick: () => change(caseItem) }}
        >
          {selectedValue && selectedValue.data === caseItem.data ? (
            <RadioActive />
          ) : (
            <StyledRadioDisabled />
          )}
          {isString(caseItem.title) ? (
            <Typography styles={[marginLeft(8)]} type="regularBody1">
              {caseItem.title}
            </Typography>
          ) : (
            caseItem.title
          )}
        </Wrapper>
      ))}
    </StyledRadioButtonWrapper>
  );
};

RadioButton.defaultProps = {
  RadioButton: Orientations.Horizontal,
};

export default React.memo(RadioButton);
