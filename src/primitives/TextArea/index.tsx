import React, { forwardRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import styled from "styled-components/macro";

import { getColor } from "libs/styles";
import eventValue from "libs/decorators/eventValue";

const StyledTextarea = styled(TextareaAutosize)`
  color: ${getColor("dimmedBlue4")};
  font-size: 13px;
  line-height: 20px;
  border: 1px solid ${getColor("dimmedBlue1")};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px 12px 10px 12px;
`;

export interface TextAreaInterface {
  value: string;
  rows?: number;
  autoFocus?: boolean;
  width?: string;
  placeholder?: string;
  styles?: any;
  onChange: (value: string) => void;
}

const TextAreaComp = forwardRef(
  (
    {
      autoFocus = false,
      value,
      rows,
      styles,
      onChange,
      placeholder,
    }: TextAreaInterface,
    ref,
  ) => {
    const [currentValue, setValue] = useState(value);

    const change = (value) => {
      setValue(value);
      onChange(value);
    };

    return (
      <StyledTextarea
        autoFocus={autoFocus}
        ref={ref}
        css={styles}
        rows={rows}
        value={currentValue}
        placeholder={placeholder}
        onChange={eventValue(change)}
      />
    );
  },
);

export default React.memo(TextAreaComp);
