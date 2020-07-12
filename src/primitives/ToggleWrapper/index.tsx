import React, { ReactNode, useState } from "react";

function useToggle(initial: boolean): [boolean, () => void] {
  const [toggle, setToggle] = useState(initial);
  return [toggle, () => setToggle(!toggle)];
}

interface ToggleInterface {
  view: (toggle, setToggle) => ReactNode;
  onToggle: (data: boolean) => void;
  initialState?: boolean;
}

export default React.memo(function ({
  view,
  initialState,
  onToggle,
}: ToggleInterface) {
  const [toggle, setToggle] = useToggle(initialState);

  React.useEffect(() => {
    if (toggle === initialState) return;
    onToggle(initialState);
    setToggle();
  }, [initialState]);

  return (
    <>
      {view(toggle, () => {
        setToggle();
        onToggle(!toggle);
      })}
    </>
  );
});
