import React, { ReactNode } from "react";
import styled from "styled-components/macro";

import { getColor } from "libs/styles";

const StyledTextPlate = styled.div`
  background-color: ${getColor("grayBackground")};
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TextPlateInterface {
  styles?: any;
  children: ReactNode;
  appendProps?: any;
  ref?: any;
}

const TextPlate = ({ styles, children, appendProps }: TextPlateInterface) => {
  return (
    <StyledTextPlate css={styles} {...appendProps}>
      {children}
    </StyledTextPlate>
  );
};

TextPlate.defaultProps = {
  appendProps: {},
};

export default React.memo(TextPlate);
