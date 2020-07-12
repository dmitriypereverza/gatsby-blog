import React, { CSSProperties } from "react";
import styled from "styled-components/macro";

import Wrapper from "primitives/Wrapper";

import { useCalculateHeightChildren } from "libs/hooks";

interface CollapseTransitionGroupInterface {
  opened: boolean;
  openedStyles?: any;
  children: JSX.Element;
}

const SDiv = styled.div``;

function getInlineStylesForStyledDiv(
  opened: boolean,
  calculatedHeight: number,
) {
  return {
    transition: "all .5s",
    height: "auto",
    maxHeight: opened ? calculatedHeight : "0px",
    overflow: opened ? "visible" : "hidden",
    opacity: opened ? "1" : "0",
  } as CSSProperties;
}

export default React.memo(function ({
  opened,
  openedStyles,
  children,
}: CollapseTransitionGroupInterface) {
  const { setRef, calculatedHeight } = useCalculateHeightChildren();

  const styles = getInlineStylesForStyledDiv(opened, calculatedHeight);

  return (
    <SDiv ref={(ref) => setRef(ref)} style={styles} css={[openedStyles]}>
      <Wrapper>{children as JSX.Element}</Wrapper>
    </SDiv>
  );
});
