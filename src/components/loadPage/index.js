// React Elements/Hooks
import { useState, useEffect, useContext } from "react";
import { Fragment } from "react/cjs/react.production.min";

// Functions
import GlobalState from "../../contexts/globalState";
import verificaBottom from "../../globalFunctions/verificaBottom";

function LoadPage(props) {
  const { endPosition, setEndPosition } = useContext(GlobalState);
  const [load, setLoad] = useState(false);
  const [temaCor, setTemaCor] = useState("custom"); //seta a cor do tema no body. Passar uma classe aqui caso queira iniciar com um tema
  
  useEffect(() => {
    if (!load) {
      setEndPosition(false);

      setLoad(true);
      console.log('ENTER')
      window.scrollTo(0, 0);
    }

    if (!endPosition) {
      window.addEventListener("scroll", scrollEnd);

      return () => {
        window.removeEventListener("scroll", scrollEnd);
      };
    }
  }, [load, endPosition]);

  function scrollEnd() {
    const recebePosition = verificaBottom();
    if (recebePosition)  {
      setEndPosition(true);
    }
  }

  return <Fragment>{props.children}</Fragment>
}

export default LoadPage;
