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

  const [load, setLoad] = useState(false);
  const [recebeLoad, setRecebeLoad] = useState({});

  const { pagesData } = useContext(GlobalState);
  const { startPage, setStartPage } = useContext(GlobalState);
  const { menuPages, setMenuPages } = useContext(GlobalState);

  let pagesAtual;
  let testeLoad;
  let allPages = [];

  const [checkConnect, setCheckConnect] = useState(false);
  const [checkLoaded, setCheckLoaded] = useState(false);

  useEffect(() => {
    if (props.sco.apiConnected) {
      setCheckConnect(true);
    }
  }, [props.sco.apiConnected]);

  useEffect(() => {
    if (checkConnect) {
      testeLoad = loadScorm_Func2(props.sco);
      setMenuPages(testeLoad.menu);
      setStartPage(testeLoad.paginaInicial);
      setCheckLoaded(true);

      console.log(testeLoad);
    }
  }, [checkConnect]);

  useEffect(() => {
    if (checkLoaded) {
      console.log(startPage);
      if (startPage !== 0) {
        console.log("passo");
        let NameElement = pagesArray[startPage];
        pagesAtual = (
          <Route
            path={`/${pagesData.curso.conteudo.telas[startPage].route}`}
            element={<NameElement />}
          />
        );
      }

      allPages = pagesArray.map((Page, id) => {
        return (
          <Route
            exact
            key={id}
            path={`/${pagesData.curso.conteudo.telas[id].route}`}
            element={<Page />}
          />
        );
      });
    }
  }, [checkLoaded, startPage, allPages]);

  if (checkLoaded == false) {
    return <div>Carregando</div>;
  } else {
    console.log(startPage, pagesData, allPages);
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
