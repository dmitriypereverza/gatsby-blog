import React, { ReactNode, useRef, useState } from "react";
import debounce from "lodash/debounce";

import ScrollView, { ScrollViewRefInterface } from "primitives/ScrollView";
import Wrapper from "primitives/Wrapper";

import { overflow, padding, position } from "libs/styles";

export const scrollHandler = (
  tabsRef: HTMLElement,
  wrapperRef: HTMLElement,
) => (event: any) => {
  if (!wrapperRef) return;
  const scrollLeft = Math.round(event.target.scrollLeft);
  const differenceWidth = tabsRef.scrollWidth - tabsRef.clientWidth;
  const first = wrapperRef.children[0] as HTMLElement;
  const last = wrapperRef.children[
    wrapperRef.childElementCount - 1
  ] as HTMLElement;

  first.style.visibility = "visible";
  last.style.visibility = "visible";

  if (scrollLeft === 0) {
    first.style.visibility = "hidden";
  }

  if (scrollLeft === differenceWidth) {
    last.style.visibility = "hidden";
  }
};

interface HorizontalScrollComponentInterface {
  children: JSX.Element;
  renderIconLeft: (scroll: () => void) => ReactNode;
  renderIconRight: (scroll: () => void) => ReactNode;
  disabled?: boolean;
  styles?: any;
}

const HorizontalScrollComponent = ({
  disabled,
  children,
  renderIconLeft,
  renderIconRight,
  styles,
}: HorizontalScrollComponentInterface) => {
  const [scrollRef, setScrollRef] = useState<ScrollViewRefInterface>(null);
  const wrapperRef = useRef<HTMLElement>(null);

  const prevScroll = () => {
    scrollRef.view.scrollBy({ left: -300, behavior: "smooth" });
  };

  const nextScroll = () => {
    scrollRef.view.scrollBy({ left: 300, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!scrollRef || !scrollRef.view) return;
    const { view } = scrollRef;
    view.style.position = "unset";
    if (!disabled) {
      view.addEventListener(
        "scroll",
        debounce(scrollHandler(view, wrapperRef.current), 30),
      );
    }
    scrollHandler(view, wrapperRef.current)({ target: { scrollLeft: 0 } });
  }, [scrollRef]);

  return (
    <Wrapper
      appendProps={{ ref: wrapperRef }}
      styles={[
        padding("0 24px"),
        overflow("hidden"),
        !disabled && position("relative"),
        styles,
      ]}
    >
      {disabled ? (
        children
      ) : (
        <>
          {renderIconLeft(prevScroll)}
          <ScrollView autoHeight disableScrollBar ref={setScrollRef}>
            {children}
          </ScrollView>
          {renderIconRight(nextScroll)}
        </>
      )}
    </Wrapper>
  );
};

export default React.memo(HorizontalScrollComponent);
