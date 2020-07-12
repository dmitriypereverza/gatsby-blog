import React, { useCallback, useMemo, useState } from "react";

export interface ComponentContainer {
  value: React.ReactNode;
}

interface AreaContextValue {
  getComponent: (areaId: string) => React.ReactElement;
  addComponent: (areaId: string, component: ComponentContainer) => void;
  removeComponent: (areaId: string, component: ComponentContainer) => void;
  updateComponent: (areaId: string, component: ComponentContainer) => void;
}

export const AreaContext = React.createContext<AreaContextValue>({
  // @ts-ignore
  addComponent: (areaId: string, component: ComponentContainer) => {},
  // @ts-ignore
  removeComponent: (areaId: string, component: ComponentContainer) => {},
  // @ts-ignore
  updateComponent: (areaId: string, component: ComponentContainer) => {},
  // @ts-ignore
  getComponent: (areaId: string) => null,
});

export function AreaProvider(props: any) {
  const [components, setComponents] = useState<{
    [key: string]: ComponentContainer;
  }>({});

  const addComponent = useCallback((areaId, component) => {
    setComponents({
      ...components,
      [areaId]: component,
    });
  }, []);

  const removeComponent = useCallback((areaId) => {
    setComponents((components) => {
      const existingComponent = components[areaId];
      if (!existingComponent) {
        return components;
      }
      delete components[areaId];
      return { ...components };
    });
  }, []);

  const updateComponent = useCallback((areaId) => {
    setComponents((component) =>
      !component[areaId] ? component : { ...component },
    );
  }, []);

  const getComponent = useCallback(
    (areaId) => {
      const cmp = components[areaId];
      if (!cmp) return null;
      return cmp.value;
    },
    [components],
  );

  const value = useMemo(
    () => ({ addComponent, getComponent, removeComponent, updateComponent }),
    [addComponent, getComponent, removeComponent, updateComponent],
  );

  return <AreaContext.Provider {...props} value={value} />;
}
