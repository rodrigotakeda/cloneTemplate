// React Elements/Hooks
import { useState, useEffect, useContext, useCallback } from "react";
import { Fragment } from "react/cjs/react.production.min";

// Functions
import GlobalState from "../../contexts/globalState";
import verificaBottom from "../../globalFunctions/verificaBottom";

function LoadPage(props) {
  const { endPosition, setEndPosition } = useContext(GlobalState);
  const [load, setLoad] = useState(false);

  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    window.onbeforeunload = function () {
      resetWindowScrollPosition();
    };
  }, [resetWindowScrollPosition]);

  useEffect(() => {
    if (!load) {
      setEndPosition(false);
      setLoad(true);
      resetWindowScrollPosition();
    }

    if (!endPosition) {
      window.addEventListener("scroll", scrollEnd);

      return () => {
        window.removeEventListener("scroll", scrollEnd);
      };
    }
  }, [load, endPosition, document.body.scrollHeight]);

  function scrollEnd() {
    let recebePosition = verificaBottom();
    if (recebePosition) {
      setEndPosition(true);
    }
  }

  return <Fragment>{props.children}</Fragment>;
}

export default LoadPage;