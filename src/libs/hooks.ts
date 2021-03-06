import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import queryString from "query-string";
import { is, once } from "ramda";
import { Placement } from "@popperjs/core/lib/enums";

import usePopper from "./usePopper";

export function useToggle(initial: boolean): [boolean, (data?) => void] {
  const [toggle, setToggle] = useState(initial);
  return [
    toggle,
    (value: boolean) => {
      if (!is(Boolean, value)) {
        return setToggle(!toggle);
      }
      setToggle(value);
    },
  ];
}

export function useBoolean(
  initial: boolean | (() => boolean),
): [boolean, () => void, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(true), () => setState(false)];
}

export function usePromiseProcessing<T, ARG>(
  promiseFunc: (arg: ARG) => Promise<T>,
  config: {
    onSuccess?: (result: T) => void;
    onError?: (error: string) => void;
    onFinish?: () => void;
  } = {},
) {
  const [{ result, error, loading }, setPromiseInfo] = useState<{
    loading: boolean;
    error: string;
    result: T;
  }>({
    result: null,
    loading: false,
    error: null,
  });

  const run = (arg: ARG) => {
    setPromiseInfo({
      result: null,
      loading: true,
      error: null,
    });

    promiseFunc(arg)
      .then((data) => {
        setPromiseInfo({
          result: data,
          loading: false,
          error: null,
        });
        config.onSuccess && config.onSuccess(data);
      })
      .catch((error) => {
        setPromiseInfo({
          result: null,
          loading: false,
          error: error.errorMessage,
        });
        config.onError && config.onError(error.errorMessage);
      })
      .then(() => {
        config.onFinish && config.onFinish();
      });
  };

  return {
    result,
    loading,
    error,
    run,
  };
}

export const useOnce = (cb: (data?: any) => any, delay = 0) => {
  const [func] = useState(() =>
    once(delay ? (data?: any) => setTimeout(() => cb(data), delay) : cb),
  );
  return func;
};

export function useForceUpdate() {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}

export function useDebouncedInput<T>(
  value: string,
  debounceTime: number,
  onChange: (value: string, additionalData?: T) => void,
  charCountThreshold = 3,
) {
  const [inputValue, setInputValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof debounce>>();
  useEffect(() => {
    debounceRef.current = debounce(onChange, debounceTime);
    return () => debounceRef.current.cancel();
  }, [onChange]);

  React.useEffect(() => {
    if (inputValue !== value) setInputValue(value);
  }, [value]);

  return {
    inputValue,
    clear: () => {
      setInputValue("");
      debounceRef.current("");
    },
    onInputChange: (value, additionalData?: T) => {
      setInputValue(value);
      if (value.length >= charCountThreshold || value.length === 0)
        debounceRef.current(value, additionalData);
    },
    setInputValue,
  };
}

export const useTabRouter = <TABS, RESULT extends TABS[keyof TABS]>(
  query: string,
  initialTab: string,
  tabs: TABS,
): {
  currentTab: string;
  TabComponent: RESULT;
  setCurrentTab: (tab: string) => void;
} => {
  const [currentTab, setCurrentTab] = useState<string>(null);
  const searchParams = queryString.parse(query);
  useEffect(() => {
    if (!searchParams.tab) {
      setCurrentTab(initialTab);
      return;
    }
    setCurrentTab(searchParams.tab as string);
  }, [searchParams.tab]);

  return {
    currentTab,
    setCurrentTab,
    TabComponent: tabs[currentTab] || (() => null),
  };
};

export const useSetDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const useEffectSkipFirst = (
  callback: React.EffectCallback,
  dependencies: any[],
) => {
  const wasChanged = useRef(false);

  useEffect(function () {
    if (wasChanged.current) {
      callback();
      return;
    }
    wasChanged.current = true;
  }, dependencies);
};

export const useCalculateHeightChildren = () => {
  const [ref, setRef] = useState<HTMLElement>(null);

  const [calculatedHeight, setCalculatedHeight] = useState(0);

  useEffect(() => {
    if (!ref) return undefined;
    const elements = ref.children;
    let sumHeightElements = 0;
    for (let i = 0; i < elements.length; i++) {
      sumHeightElements += elements[i].clientHeight;
    }
    setCalculatedHeight(sumHeightElements);
  }, [ref]);

  return { setRef, calculatedHeight };
};

export function useConnectPoperTooltip({
  target,
  placement = "bottom",
}: {
  target: string;
  placement?: Placement;
}) {
  const tick = useRef<NodeJS.Timeout>();

  const [isShowing, setIsShowing] = useState(false);
  const [isParentExist, setParentExist] = useState(false);
  const content = useRef<HTMLElement>();

  const initPopper = usePopper({ placement, offset: [0, 8] });

  useEffect(() => {
    if (!target) return undefined;
    tick.current = setInterval(() => {
      const el = document.querySelector(target);
      if (el) {
        initPopper("parent")(el as HTMLElement);
        clearInterval(tick.current);
        setParentExist(true);
      }
    }, 1000);
  }, [target]);

  function show(needShow: boolean) {
    setIsShowing(needShow);
    if (!content.current || !isParentExist) return undefined;
    // @ts-ignore
    content.current.style.display = needShow ? "block" : "none";
  }

  return [
    (ref: any) => {
      content.current = ref;
      initPopper("child")(content.current as HTMLElement);
      show(isShowing);
    },
    show,
  ];
}
