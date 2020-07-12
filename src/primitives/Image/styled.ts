import styled from "styled-components/macro";

import { getColor } from "libs/styles";

export const InputWrapper = styled.div`
  display: flex;
  font-size: 13px;
  width: 100%;
`;

export const StyledInput = styled.input`
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
