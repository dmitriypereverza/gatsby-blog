import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalInterface {
  selector: string;
  children: ReactNode;
}
export default ({ selector, children }: PortalInterface) =>
  ReactDOM.createPortal(children, document.querySelector(selector));
