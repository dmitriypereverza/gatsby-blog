import React from "react";
import styled from "styled-components/macro";

import { fullHeight, fullWidth } from "libs/styles";

const StyledImage = styled.div`
  border-radius: 4px;
  background-image: url(${(props) => (props.src ? props.src : "")});
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 50%;
  background-size: cover;
`;

interface InputInterface {
  src: string;
  width: string;
  height: string;
  styles?: any[];
}

const ImageComponent = (props: InputInterface) => {
  const { width, height, src, styles } = props;
  return (
    <StyledImage
      css={[fullWidth, fullHeight, ...styles]}
      src={src}
      width={width}
      height={height}
    />
  );
};

ImageComponent.defaultProps = {
  styles: [],
  width: "100%",
  height: "100%",
};

export default React.memo(ImageComponent);
