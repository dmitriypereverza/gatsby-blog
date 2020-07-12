import React from "react";
import { withRouter as withReactRouter } from "react-router";

export default function withRouter<Props>(
  App: React.FC<Props>,
): React.FC<Omit<Props, "history" | "location" | "match" | "staticContext">> {
  // @ts-ignore
  return withReactRouter(App);
}
