import React, { ReactNode, Ref } from "react";
import ReactDOM from "react-dom";
import { isNil } from "ramda";
import debounce from "lodash/debounce";

export enum EventClickName {
  MouseUp = "mouseup",
  MouseDown = "mousedown",
}

interface ClickOutSideInterface {
  children: ReactNode;
  handleEnabled?: boolean;
  handleClickOut: () => void;
  delay?: number;
  clickEventName?: EventClickName;
  refs?: Ref<HTMLElement>[];
}
class ClickOutside extends React.Component<ClickOutSideInterface> {
  componentDidMount() {
    document.addEventListener(
      this.props.clickEventName || EventClickName.MouseUp,
      this.props.delay
        ? debounce(this.handleClickOut, this.props.delay)
        : this.handleClickOut,
      true,
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      this.props.clickEventName || EventClickName.MouseUp,
      this.handleClickOut,
      true,
    );
  }

  hasElementIntoRefs = (refs: Ref<HTMLElement>[], element): boolean => {
    if (!refs || !refs.length) {
      return false;
    }

    return refs
      .map((ref: any) => ref.current)
      .some((elem: HTMLElement) => {
        return elem.contains(element);
      });
  };

  handleClickOut = (event) => {
    const { handleEnabled, handleClickOut, refs } = this.props;
    if (!isNil(handleEnabled) && !handleEnabled) return;
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      !this.hasElementIntoRefs(refs, event.target) && handleClickOut();
    }
  };

  render() {
    return this.props.children;
  }
}

export default ClickOutside;
