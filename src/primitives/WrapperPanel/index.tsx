import React from "react";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Button, { ButtonType } from "primitives/Button";
import CollapseTransitionGroup from "primitives/CollapseTransitionGroup";

import { ai, Aligns, flex, marginLeft, padding, pointer } from "libs/styles";
import { useBoolean } from "libs/hooks";
import stopPropagation from "libs/decorators/stopPropagation";

interface WrapperPanelInterface {
  title: string;
  children: any;
  localStorageSaveCode?: string;
  initialValue?: boolean;
}
export default React.memo(function ({
  title,
  initialValue = false,
  children,
  localStorageSaveCode,
}: WrapperPanelInterface) {
  const [opened, open, close] = useBoolean(() => {
    if (!localStorageSaveCode) {
      return initialValue;
    }
    const savedValue = localStorage.getItem(localStorageSaveCode);
    if (savedValue === null) return initialValue;
    return savedValue === "true";
  });

  const toggle = () => {
    localStorageSaveCode &&
      localStorage.setItem(localStorageSaveCode, (!opened).toString());
    opened ? close() : open();
  };

  return (
    <>
      <Wrapper
        styles={[padding("16px 0 16px 24px"), flex, ai(Aligns.CENTER), pointer]}
        appendProps={{ onClick: toggle }}
      >
        <Button
          type={ButtonType.iconSmall}
          iconLeft={opened ? "arrowUp" : "arrowDown"}
          onClick={stopPropagation(toggle)}
        />
        <Typography type="mediumHeadLine" styles={marginLeft(8)}>
          {title}
        </Typography>
      </Wrapper>
      <CollapseTransitionGroup opened={opened}>
        {children}
      </CollapseTransitionGroup>
    </>
  );
});
