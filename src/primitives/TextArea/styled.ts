import styled from "styled-components/macro";

import { getColor } from "libs/styles";

export const TextAreaWrapper = styled.div`
  display: flex;
  font-size: 13px;
  width: 100%;
  fill: ${getColor("dimmedBlue2")};
  :hover {
    ${(props) => props.clickableIcon && `fill: ${getColor("dimmedBlue3")}`};
  }
`;

export const StyledTextArea = styled.textarea`
  color: ${getColor("dimmedBlue4")};
  ::placeholder {
    color: ${getColor("dimmedBlue2")};
    opacity: 1;
  }
  ::-webkit-input-placeholder {
    color: ${getColor("dimmedBlue2")};
  }
  :-ms-input-placeholder {
    color: ${getColor("dimmedBlue2")};
  }
`;
