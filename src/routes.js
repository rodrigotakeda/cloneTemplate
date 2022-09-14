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

function ScreenRoutes(props) {
  const pagesArray = [Page1, Page2, Page3, Page4]; // adicione as chamadas de pagina desse array

  const { pagesData } = useContext(GlobalState);
  const { startPage, setStartPage } = useContext(GlobalState);
  const { menuPages, setMenuPages } = useContext(GlobalState);

  let recebeLoad;
  const [pagesAtual, setPagesAtual] = useState();
  const [allPages, setAllPages] = useState([]);

  const [checkConnect, setCheckConnect] = useState(false);
  const [checkLoaded, setCheckLoaded] = useState(false);
  const [checkPages, setCheckPages] = useState(false);
  const [counterEntry, setCounterEntry] = useState(0);
  const [errorLoader, setErrorLoader] = useState('Carregando...');
  
  useEffect(() => {
    if (counterEntry === 0) {
      setCounterEntry(counterEntry + 1);
    } else if (counterEntry > 0) {
      if (pagesData.curso.scorm && props.sco.apiConnected) {
        console.log('CAMINHO 1')  
        setCheckConnect(true);
      } else if ((!pagesData.curso.scorm && props.sco.apiConnected) || (pagesData.curso.scorm && !props.sco.apiConnected)) {
        setCheckConnect(false);
        if (props.sco.apiConnected) { 
          setErrorLoader('JSON não configurado para o Scorm!')
        } else {
          setErrorLoader('SCORM Habilitado no JSON, Desabilite!')
        }
      } else {
        console.log('CAMINHO 3')
        setCheckConnect(true);
      }
    }
  }, [props.sco.apiConnected, counterEntry]);

  useEffect(() => {
    if (checkConnect) {
      recebeLoad = loadScorm_Func(props.sco);
      // console.log('Load:', recebeLoad)
      setMenuPages(recebeLoad.menu);
      setStartPage(recebeLoad.paginaInicial);

      setCheckLoaded(true);
    }
  }, [checkConnect]);

  useEffect(() => {
    if (checkLoaded) {
      if (startPage !== 0) {
        let NameElement = pagesArray[startPage];
        setPagesAtual(
          <Route
            path={`/${pagesData.curso.conteudo.telas[startPage].route}`}
            element={<NameElement />}
          />
        );
      }

      setAllPages(
        pagesArray.map((Page, id) => {
          return (
            <Route
              exact
              key={id}
              path={`/${pagesData.curso.conteudo.telas[id].route}`}
              element={<Page />}
            />
          );
        })
      );

      setCheckPages(true);
    }
  }, [checkLoaded, menuPages, startPage]);

  if (checkPages == false) {
    return <div>{errorLoader}</div>;
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
