import React from "react";

import { AreaContext, ComponentContainer } from "./AreaProvider";

const { useEffect, useContext, useRef } = React;

export function useRender(areaId: string, children: React.ReactNode) {
  const { addComponent, removeComponent, updateComponent } = useContext(
    AreaContext,
  );
  const ref = useRef<ComponentContainer>({ value: children });

  useEffect(() => {
    addComponent(areaId, ref.current);
    return () => {
      removeComponent(areaId, ref.current);
    };
  }, [ref.current, addComponent, removeComponent]);

  useEffect(() => {
    ref.current.value = children;
    updateComponent(areaId, ref.current);
  }, [children]);
}

export const ContentArea: React.FunctionComponent<{ name: string }> = ({
  name: areaId,
  children,
}) => {
  useRender(areaId, children);
  return null;
};
