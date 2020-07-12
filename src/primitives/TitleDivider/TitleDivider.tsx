import React from "react";
import styled, { css } from "styled-components/macro";

const TitleDividerWrapper = styled.span`
  background-color: #e5e9eb;
  display: block;

  ${(prop) =>
    !prop.vertical
      ? css`
          height: 1px;
          min-height: 1px;
          right: 0;
        `
      : css`
          height: 100%;
          width: 1px;
          min-width: 1px;
        `}
`;

interface WrapperInterface {
  styles?: any[];
  as?: string;
  appendProps?: any;
  vertical?: boolean;
}
export default React.memo(function ({
  styles,
  vertical = false,
  as,
}: WrapperInterface) {
  return <TitleDividerWrapper vertical={vertical} css={styles} as={as} />;
});
