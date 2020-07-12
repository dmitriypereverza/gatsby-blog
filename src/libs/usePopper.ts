import React from "react";
import { createPopper, Instance } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy } from "@popperjs/core/lib/types";

const initialData: UsePopperInterface = {
  offset: [0, 8],
  placement: "bottom",
  strategy: "absolute",
};

interface UsePopperInterface {
  placement?: Placement;
  strategy?: PositioningStrategy;
  offset?: [number, number];
}

function getPopperData(inputData: UsePopperInterface) {
  inputData = inputData || initialData;
  return {
    offset: inputData.offset || initialData.offset,
    placement: inputData.placement || initialData.placement,
    strategy: inputData.strategy || initialData.strategy,
  };
}

export default function usePopper(data?: UsePopperInterface) {
  const { placement, offset, strategy } = getPopperData(data);
  const [parent, setParent] = React.useState<HTMLElement>();
  const [child, setChild] = React.useState<HTMLElement>();
  const [instance, setInstance] = React.useState<Instance>();

  const destroy = () => {
    if (!instance) return;
    instance.destroy();
    setInstance(null);
  };

  React.useEffect(() => {
    if (!child) return destroy;
    if (!parent) return destroy;
    const instance = createPopper(parent, child, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset,
          },
        },
      ],
      placement,
      strategy,
    });
    setInstance(instance);
    return destroy;
  }, [parent, child]);

  return (forObject: "parent" | "child") => (ref: HTMLElement) => {
    if (!ref) return;
    if (forObject === "child") {
      setChild(ref);
      return;
    }
    setParent(ref);
  };
}
