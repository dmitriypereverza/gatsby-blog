import React, { useContext } from "react";

import { AreaContext } from "./AreaProvider";

interface Props {
  name: string;
}
export const RenderArea = ({ name }: Props) => {
  const context = useContext(AreaContext);
  return <>{context.getComponent(name)}</>;
};
