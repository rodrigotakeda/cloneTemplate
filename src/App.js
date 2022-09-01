import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import PagesService from "./services/pages";
import ScreenRoutes from "./routes";
import GlobalState from "./contexts/globalState"; //state global
import { ParallaxProvider } from "react-scroll-parallax";
import ScormProvider, { withScorm } from "react-scorm-provider";

function App(props) {
  const [pagesData, setPagesData] = useState(false);
  const [menuScrolled, setMenuScrolled] = useState(0);
  const [endPosition, setEndPosition] = useState(false);

  const isScorm = props.sco.apiConnected;
  const [load, setLoad] = useState(false);
  const [newSuspendData, setNewSuspendData] = useState([]);
  const [startPage, setStartPage] = useState(0);
  const [lastPageView, setLastPageView] = useState(0);

  useEffect(() => {
    if (props.sco && isScorm && !load) {
      if (props.sco.suspendData.menu) { setNewSuspendData(props.sco.suspendData.menu); }
      setLoad(true)
    } else if (!load) {
      if (window.sessionStorage.getItem('menu')) { setNewSuspendData(JSON.parse(window.sessionStorage.getItem('menu'))); }
      setLoad(true)
    }

    if (load) {
      if (newSuspendData.length !== 0) {
        let newCounter = Number(0);
        newSuspendData.forEach(obj => { if (obj === 1) newCounter++; })
        setStartPage(newCounter)
      }

      loadData();
    } 
  }, [isScorm, load, startPage]);
  
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
        <GlobalState.Provider value={{ pagesData, setPagesData, menuScrolled, setMenuScrolled, endPosition, setEndPosition, lastPageView, setLastPageView }}>
          <ParallaxProvider>
            <ScreenRoutes pagesData={pagesData} paginaInicial={startPage} />
          </ParallaxProvider>
        </GlobalState.Provider>
      </ScormProvider>
    );
  }
}

export default withScorm()(App);
