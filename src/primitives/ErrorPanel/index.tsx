import styled from "styled-components/macro";

import { getColor } from "libs/styles";

export default styled.div`
  line-height: 20px;
  font-size: 13px;
  margin-top: 16px;
  padding: 8px 16px;
  color: ${getColor("red")};
  background-color: ${getColor("error")};
  border-radius: 4px;
  align-items: center;
  text-align: center;
`;
