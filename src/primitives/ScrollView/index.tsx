import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export interface ScrollViewRefInterface {
  view: HTMLElement;
  getScrollTop: () => number;
}

const emptyDiv = () => <div />;

interface ScrollViewProps {
  className?: string;
  children: any;
  disableAutoHide?: boolean;
  disableScrollBar?: boolean;
  autoHeight?: boolean;
  style?: any;
  appendProps?: any;
  ref?: (data: ScrollViewRefInterface) => void;
  onScroll?: (data) => void;
}

const ScrollView = React.forwardRef(function (
  {
    onScroll,
    className,
    autoHeight,
    children,
    style,
    appendProps,
    disableScrollBar,
    disableAutoHide,
  }: ScrollViewProps,
  ref,
) {
  return (
    <Scrollbars
      className={className}
      style={style}
      autoHeight={autoHeight}
      autoHide={!disableAutoHide}
      onScroll={onScroll}
      renderTrackHorizontal={disableScrollBar && emptyDiv}
      renderTrackVertical={disableScrollBar && emptyDiv}
      {...appendProps}
      ref={ref}
    >
      {children}
    </Scrollbars>
  );
});

export default React.memo(ScrollView);
