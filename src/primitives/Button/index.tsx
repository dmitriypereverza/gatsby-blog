import React from "react";

import ButtonTextWithoutBorder from "primitives/Button/buttonStyles/ButtonTextWithoutBorder";

import ButtonPrimary from "./buttonStyles/primary";
import ButtonText from "./buttonStyles/text";
import ButtonLine from "./buttonStyles/line";
import ButtonIconLarge from "./buttonStyles/iconLarge";
import ButtonIconSmall from "./buttonStyles/iconSmall";
import { Icons } from "../SVG";

export enum ButtonType {
  primary,
  line,
  text,
  iconLarge,
  iconSmall,
  textWithoutBorder,
}

const styleMap = {
  [ButtonType.primary]: ButtonPrimary,
  [ButtonType.line]: ButtonLine,
  [ButtonType.text]: ButtonText,
  [ButtonType.iconLarge]: ButtonIconLarge,
  [ButtonType.iconSmall]: ButtonIconSmall,
  [ButtonType.textWithoutBorder]: ButtonTextWithoutBorder,
};

interface ButtonInterface {
  className?: string;
  type?: ButtonType;
  loading?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
  disabled?: boolean;
  styles?: any;
  textStyles?: any;
  outerStyles?: any;
  iconStyles?: any;
  children?: React.ReactNode;
  onClick: () => void;
}

function Button(props: ButtonInterface) {
  const { children, type, disabled, loading } = props;
  const CustomWrapper = styleMap[type];
  return (
    <CustomWrapper {...props} disabled={disabled || loading}>
      {children}
    </CustomWrapper>
  );
}

Button.defaultProps = {
  disabled: false,
  type: ButtonType.primary,
  loading: false,
};

export default React.memo(Button);
