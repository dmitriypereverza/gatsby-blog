import React from "react";

export default function (
  opened: boolean,
  close: () => void,
  milliseconds = 3000,
) {
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (opened) {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        close();
        timerRef.current = null;
      }, milliseconds);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, [opened]);

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  return close;
}
