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
  const pagesArray = [Page2, Page1, Page3, Page4]; // adicione as chamadas de pagina desse array
  const isScorm = props.sco.apiConnected;

  const [load, setLoad] = useState(false);

  const { pagesData } = useContext(GlobalState);
  const { startPage, setStartPage } = useContext(GlobalState);
  const { menuPages, setMenuPages } = useContext(GlobalState);

  let pagesAtual;
  let recebeLoad;

  useEffect(() => {
    console.log(props.sco, isScorm)

    // if (props.sco && isScorm) {
    //   if (load) {
    //     recebeLoad = loadScorm_Func(props.sco);
    //     console.log('App Sco: ', recebeLoad.data)
    //   }
    // } else {
    //   if (load) {
    //     recebeLoad = loadScorm_Func(props.sco);
    //     console.log('App Session: ', recebeLoad.data)
    //   }
    // }
    // // setMenuPages(recebeLoad.data.menu);
    // // setStartPage(recebeLoad.data.paginaInicial);
    // if (!load) setLoad(true)
  }, []);

  if (startPage !== 0) {
    let NameElement = pagesArray[startPage];
    pagesAtual = (<Route
          path={`/${pagesData.curso.conteudo.telas[startPage].route}`}
          element={<NameElement />}
        />
      )
  }

  const allPages = pagesArray.map((Page, id) => {
    return (
      <Route
        exact
        key={id}
        path={`/${pagesData.curso.conteudo.telas[id].route}`}
        element={<Page />}
      />
    );
  });

  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Navigate to={`${pagesData.curso.conteudo.telas[startPage].route}`} />
          }
        />
        {pagesAtual}
        {allPages}
      </Routes>
    </HashRouter>
  );
}

export default withScorm()(ScreenRoutes);