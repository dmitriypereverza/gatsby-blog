import React, { ReactNode, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";

import {
  backgroundColor,
  borderRadius,
  boxShadow,
  capitalizeFirstLetter,
  flex,
  maxWidth,
  padding,
  paddingBottom,
  paddingTop,
  wrapTextNormal,
  zIndex,
} from "libs/styles";
import usePopper from "libs/usePopper";
import { asyncTimeout } from "libs/asyncTimeout";

import Wrapper from "../Wrapper";
import { TypographyTypes } from "../Typography";

interface TooltipInterface {
  text: ReactNode;
  children: (ref: (element: HTMLElement) => void) => ReactNode;
  maxWidth?: number;
  showMode?: TooltipShowMode;
  strategy?: "fixed" | "absolute";
}

export enum TooltipShowMode {
  HOVER,
  CLICK,
}

const showModeHooks = {
  [TooltipShowMode.HOVER]: () => {
    const [parentRef, setParentRef] = useState<HTMLElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const debounceRef = useRef<Cancelable>();

    useEffect(() => {
      if (!parentRef) return;
      parentRef.addEventListener("mouseenter", () => {
        if (!showTooltip) {
          const debouncedFunc = debounce(() => setShowTooltip(true), 200);
          debounceRef.current = debouncedFunc;
          debouncedFunc();
        }
      });
      parentRef.addEventListener("mouseleave", () => {
        debounceRef.current && debounceRef.current.cancel();
        setTimeout(() => setShowTooltip(false), 200);
      });
    }, [parentRef]);

    return {
      showTooltip,
      setParentRef,
      setChildRef: () => null,
    };
  },
  [TooltipShowMode.CLICK]: () => {
    const [parentRef, setParentRef] = useState<HTMLElement>(null);
    const childRef = useRef<HTMLElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
      const closeTooltipListener = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        ev.cancelBubble = true;
        if (childRef.current.contains(ev.target as HTMLElement)) return;
        setShowTooltip(false);
        document.body.removeEventListener("click", closeTooltipListener, true);
        parentRef.addEventListener("click", parentClickListener);
      };

      const parentClickListener = async () => {
        setShowTooltip(true);
        await asyncTimeout(100);
        parentRef.removeEventListener("click", parentClickListener);
        document.body.addEventListener("click", closeTooltipListener, true);
      };

      const destroy = () => {
        if (parentRef)
          parentRef.removeEventListener("click", parentClickListener);
        document.body.removeEventListener("click", closeTooltipListener, true);
      };
      if (!parentRef) return destroy;
      parentRef.addEventListener("click", parentClickListener);
      return destroy;
    }, [parentRef]);

    return {
      showTooltip,
      setParentRef,
      setChildRef: (ref: HTMLElement) => (childRef.current = ref),
    };
  },
};

const Tooltip = ({
  children,
  text,
  showMode,
  maxWidth: maxWidthProp,
  strategy = "absolute",
}: TooltipInterface) => {
  const { showTooltip, setParentRef, setChildRef } = showModeHooks[showMode]();

  const initPopper = usePopper({
    strategy: strategy,
  });

  return (
    <>
      {children((ref) => {
        initPopper("parent")(ref);
        setParentRef(ref);
      })}
      {text && showTooltip && (
        <Wrapper
          ref={(ref: any) => {
            initPopper("child")(ref);
            setChildRef(ref);
          }}
          styles={[
            flex,
            zIndex(999),
            maxWidth(maxWidthProp),
            wrapTextNormal,
            boxShadow([0, 2, 8, "rgba(0, 0, 0, .2)"]),
            borderRadius(2),
            TypographyTypes["regularCaption"],
            padding(8),
            paddingBottom(4),
            paddingTop(4),
            backgroundColor("white"),
            capitalizeFirstLetter,
          ]}
        >
          {text}
        </Wrapper>
      )}
    </>
  );
};

Tooltip.defaultProps = {
  maxWidth: 392,
  showMode: TooltipShowMode.HOVER,
};

export default Tooltip;
