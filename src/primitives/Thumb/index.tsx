import React from "react";
import { prop } from "ramda";
import styled from "styled-components/macro";

import Typography from "primitives/Typography";

import { backgroundColor, border, fontSize, getColor } from "libs/styles";

import { initialsByFIO } from "projectLibs/initialsByName";

import { ThumbInterface } from "./types";

const StyledCircle = styled.div`
  position: relative;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: ${prop("size")}px;
  width: ${prop("size")}px;
  min-width: ${prop("size")}px;
  height: ${prop("size")}px;
  min-height: ${prop("size")}px;
  background-color: ${getColor("dimmedBlue2")};
  ${(props) =>
    props.url
      ? `background-image: url(${props.url});`
      : `background-color: ${getColor(
          "dimmedBlue1",
        )};border: 1px solid ${getColor("dimmedBlue2")};`};
  ${(props) => props.blueBorder && `border: 2px solid ${getColor("blue3")};`};
`;

export default React.memo(function ({
  as,
  styles,
  size = 40,
  image,
  placeholder,
  smallPlaceholder,
  blueBorder,
  color,
  appendProps,
}: ThumbInterface) {
  return (
    <StyledCircle
      as={as}
      css={[color && [backgroundColor(color, 0.2), border(1, color)], styles]}
      size={size}
      url={"/" + image}
      blueBorder={blueBorder}
      {...appendProps}
    >
      {!image && placeholder ? (
        <Typography
          type="boldBody2"
          color={color ? color : "dimmedBlue2"}
          styles={smallPlaceholder ? [fontSize(9)] : []}
        >
          {initialsByFIO(placeholder)}
        </Typography>
      ) : null}
    </StyledCircle>
  );
});
