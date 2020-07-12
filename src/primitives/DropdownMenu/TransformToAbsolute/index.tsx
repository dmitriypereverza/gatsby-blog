import React, { ReactNode, useCallback, useState } from "react";

import Wrapper from "primitives/Wrapper";
import Portal from "primitives/Portal";

import { left, position, top } from "libs/styles";

interface TransformToAbsoluteInterface {
  children: () => ReactNode;
  selector: string;
}
export const TransformToAbsolute = ({
  children,
  selector,
}: TransformToAbsoluteInterface) => {
  const [boundingClientRect, setBoundingClientRect] = useState<DOMRect>();
  const cbRef = useCallback((node) => {
    setBoundingClientRect(node ? node.getBoundingClientRect() : null);
  }, []);
  return (
    <Wrapper ref={cbRef}>
      {boundingClientRect ? (
        <Portal selector={selector}>
          <Wrapper
            styles={[
              position("absolute"),
              left(boundingClientRect.left + window.pageXOffset),
              top(boundingClientRect.top + window.pageYOffset),
            ]}
          >
            {children()}
          </Wrapper>
        </Portal>
      ) : null}
    </Wrapper>
  );
};
