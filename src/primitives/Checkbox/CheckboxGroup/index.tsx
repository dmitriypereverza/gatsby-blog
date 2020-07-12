import React, { useState, Fragment } from "react";
import styled from "styled-components/macro";
import { without } from "ramda";

import TitleDivider from "primitives/TitleDivider/TitleDivider";

import { CaseInterface } from "components/EditableInputs/RadioList";

import { marginTop } from "libs/styles";

import Checkbox from "../index";

const StyledCheckBoxesWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === Orientations.Vertical ? "column" : "row"};
`;

export enum Orientations {
  Horizontal,
  Vertical,
}

interface CheckboxGroupInterface {
  styles?: any;
  itemStyles?: any;
  onLeft?: boolean;
  orientation?: Orientations;
  selected?: string[];
  showTitle?: boolean;
  cases: CaseInterface[];
  withDivider?: boolean;
  onChange: (selectedElements: string[]) => void;
}

const CheckboxGroup = ({
  styles,
  itemStyles,
  onLeft,
  orientation,
  cases,
  selected,
  onChange,
  withDivider,
  showTitle = true,
}: CheckboxGroupInterface) => {
  const [selectedValues, setValue] = useState(selected);

  const change = (item: string, newSelected: boolean) => {
    const newList = newSelected
      ? [...selectedValues, item]
      : without([item], selectedValues);

    setValue(newList);
    onChange(newList);
  };

  return (
    <StyledCheckBoxesWrapper orientation={orientation} css={styles}>
      {cases.map((caseItem, index) => (
        <Fragment key={index}>
          <Checkbox
            styles={[index !== 0 ? marginTop(12) : null, itemStyles]}
            selected={selectedValues && selectedValues.includes(caseItem.data)}
            onLeft={onLeft}
            title={showTitle && caseItem.title}
            onChange={(newSelected) => change(caseItem.data, newSelected)}
          />
          {withDivider && <TitleDivider styles={[marginTop(11)]} />}
        </Fragment>
      ))}
    </StyledCheckBoxesWrapper>
  );
};

CheckboxGroup.defaultProps = {
  CheckBoxes: Orientations.Horizontal,
  cases: [],
  onLeft: true,
};

export default React.memo(CheckboxGroup);
