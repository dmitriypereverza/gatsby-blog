import React, { useRef } from "react";
import { isNil } from "ramda";

import {
  backgroundColor,
  border,
  borderRadius,
  bottom,
  color,
  Colors,
  flex,
  fullHeight,
  getColor,
  height,
  left,
  lineHeight,
  marginBottom,
  padding,
  paddingRight,
  position,
  right,
  top,
  width,
} from "libs/styles";

import Typography from "../Typography";
import Wrapper from "../Wrapper";
import SVG, { Icons } from "../SVG";
import { InputWrapper, StyledInput } from "./styled";

const inputStyle = { width: "100%", marginLeft: 12 };

export enum InputType {
  NUMBER = "number",
  TEXT = "text",
  PASSWORD = "password",
}

interface TypeConfigInterface {
  type: string;
  onChangeMiddleware?: (data: any) => any;
}

interface InputTypeInterface {
  [key: string]: TypeConfigInterface;
}

const inputTypeMap: InputTypeInterface = {
  number: {
    type: "text",
    onChangeMiddleware: (text) => text.replace(/[^0-9\.]/g, ""),
  },
  text: {
    type: "text",
  },
  password: {
    type: "password",
  },
};

export interface InputInterface {
  disable?: boolean;
  wrapperAppendProps?: Record<string, any>;
  children?: React.ReactNode;
  value: string;
  iconColor?: Colors;
  title?: string;
  type?: InputType;
  autoFocus?: boolean;
  placeholder?: string;
  styles?: any[];
  inputStyles?: any[];
  icon?: Icons;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  iconOnClick?: (ev: Event) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputComp = React.forwardRef(
  (
    {
      wrapperAppendProps,
      children,
      title,
      value,
      type = InputType.TEXT,
      placeholder,
      styles,
      disable,
      inputStyles = [],
      icon,
      onChange,
      onSubmit,
      iconOnClick,
      autoFocus,
      onBlur,
      iconColor,
      onFocus,
    }: InputInterface,
    outerRef?: any,
  ) => {
    const ref = outerRef ? outerRef : useRef();

    const typeConfig = inputTypeMap[type] as TypeConfigInterface;

    const localOnChange = (data) => {
      if (typeConfig.onChangeMiddleware) {
        data = typeConfig.onChangeMiddleware(data);
      }
      onChange && onChange(data);
    };

    return (
      <Wrapper styles={[styles, disable && backgroundColor("dimmedBlue0")]}>
        {title ? (
          <Typography
            type="regularBody1"
            styles={[color("dimmedBlue3"), marginBottom(8)]}
          >
            {title}
          </Typography>
        ) : null}
        <Wrapper
          styles={[
            flex,
            border(1, "dimmedBlue1"),
            borderRadius(4),
            height(40),
            ...inputStyles,
          ]}
          appendProps={wrapperAppendProps}
        >
          <InputWrapper clickableIcon={!!iconOnClick}>
            <StyledInput
              autoFocus={autoFocus}
              disabled={disable}
              type={typeConfig.type}
              ref={ref}
              style={{
                ...inputStyle,
                ...(disable
                  ? { backgroundColor: getColor("dimmedBlue0") }
                  : {}),
              }}
              value={value}
              onChange={(event) => localOnChange(event.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyPress={
                onSubmit
                  ? (ev) => {
                      if (ev.key === "Enter") onSubmit();
                    }
                  : null
              }
            />
            {(isNil(value) || value === "") && (
              <Typography
                type="regularBody1"
                useDotes
                styles={[
                  position("absolute"),
                  top(12),
                  left(12),
                  right(12),
                  bottom(12),
                  lineHeight("unset"),
                  color("dimmedBlue2"),
                  icon ? paddingRight(20) : null,
                ]}
                onClick={() => {
                  // @ts-ignore
                  ref.current ? ref.current.focus() : null;
                }}
              >
                {placeholder}
              </Typography>
            )}
            {icon && (
              <SVG
                width={24}
                height={24}
                styles={[padding(8), width(40), fullHeight]}
                iconName={icon}
                onClick={!disable ? iconOnClick : null}
                color={iconColor}
              />
            )}
          </InputWrapper>
          {children}
        </Wrapper>
      </Wrapper>
    );
  },
);

export default React.memo(InputComp);
