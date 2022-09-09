import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useContext, useEffect, useState } from "react";
import Page1 from "./screens/page1";
import Page2 from "./screens/page2";
import Page3 from "./screens/page3";
import Page4 from "./screens/page4";

import { withScorm } from "react-scorm-provider";

import GlobalState from "./contexts/globalState";
import loadScorm_Func from "./globalFunctions/loadScorm_Func";
import loadScorm_Func2 from "./globalFunctions/loadScorm_Func2";

function ScreenRoutes(props) {
  const pagesArray = [Page2, Page1, Page3, Page4]; // adicione as chamadas de pagina desse array
  const isScorm = props.sco.apiConnected;

  const { pagesData } = useContext(GlobalState);
  const { startPage, setStartPage } = useContext(GlobalState);
  const { menuPages, setMenuPages } = useContext(GlobalState);

  let recebeLoad;

  const [pagesAtual, setPagesAtual] = useState();
  const [allPages, setAllPages] = useState([]);

  const [checkConnect, setCheckConnect] = useState(false);
  const [checkLoaded, setCheckLoaded] = useState(false);
  const [checkPages, setCheckPages] = useState(false);

  useEffect(() => {
    if (props.sco.apiConnected) {
      setCheckConnect(true);
    }
  }, [props.sco.apiConnected]);

  useEffect(() => {
    if (checkConnect) {
      recebeLoad = loadScorm_Func2(props.sco);
      setMenuPages(recebeLoad.menu);
      setStartPage(recebeLoad.paginaInicial);

      setCheckLoaded(true)
    }
  }, [checkConnect]);

  useEffect(() => {
    if (checkLoaded) {
      console.log('RouteMenu: ', menuPages)
      if (startPage !== 0) {
        let NameElement = pagesArray[startPage];
        setPagesAtual(
          <Route
            path={`/${pagesData.curso.conteudo.telas[startPage].route}`}
            element={<NameElement />}
          />
        );
      }

      setAllPages(pagesArray.map((Page, id) => {
        return (
          <Route
            exact
            key={id}
            path={`/${pagesData.curso.conteudo.telas[id].route}`}
            element={<Page />}
          />
        );
      }));

      setCheckPages(true);
    }
  }, [checkLoaded, menuPages, startPage]);

  if (checkPages == false) {
    return <div>Carregando</div>;
  } else {
    return (
      <HashRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Navigate
                to={`${pagesData.curso.conteudo.telas[startPage].route}`}
              />
            }
          />
          {pagesAtual}
          {allPages}
        </Routes>
      </HashRouter>
    );
  }
}

export default withScorm()(ScreenRoutes);
