import React from "react";
import { Fragment, useEffect, useState } from "react";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import PagesService from "./services/pages";
import ScreenRoutes from "./routes";
import GlobalState from "./contexts/globalState"; //state global
import { ParallaxProvider } from "react-scroll-parallax";
import ScormProvider, { withScorm } from "react-scorm-provider";

import loadScorm_Func from "./components/scorm/loadScorm_Func";

function App(props) {
  const [pagesData, setPagesData] = useState(false);
  const [menuScrolled, setMenuScrolled] = useState(0);
  const [endPosition, setEndPosition] = useState(false);

  const [startPage, setStartPage] = useState(0);
  const [menuPages, setMenuPages] = useState([]);

  useEffect(() => {
    let recebeLoad = loadScorm_Func(props.sco);
  
    setMenuPages(recebeLoad.data.menu);
    setStartPage(recebeLoad.data.paginaInicial);

    loadData();
  }, []);

  //checagem se o navegador suporta o userAgentData
  let platform =
    navigator?.userAgentData?.platform || navigator?.platform || "unknown";

  //checagem se é um dispostivo IOS
  let iOS = /iPad|iPhone|iPod/.test(platform);
  // macOS|MacIntel

  useEffect(() => {
    if (iOS) {
      document.body.classList.add("ios");
    }
  });

  async function loadData() {
    const data = await PagesService.getPages();
    setPagesData(data);
  }

  if (pagesData === false) {
    return (
      <Fragment>
        <div className="loadingContent">
          <div className="loaderSpinner">
            <div className="loadingio-spinner">
              <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

            <div className="textoLoader">Carregando...</div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    document.title = pagesData.curso.titulo;

    return (
      <ScormProvider version="1.2" debug={process.env.NODE_ENV !== 'production'}>
        <GlobalState.Provider value={{ pagesData, setPagesData, menuScrolled, setMenuScrolled, endPosition, setEndPosition, startPage, setStartPage, menuPages, setMenuPages }}>
          <ParallaxProvider>
            <ScreenRoutes pagesData={pagesData} paginaInicial={startPage} />
          </ParallaxProvider>
        </GlobalState.Provider>
      </ScormProvider>
    );
  }
}

export default withScorm()(App);
