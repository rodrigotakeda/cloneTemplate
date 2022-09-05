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

  let newCounter = Number(0);

  const isScorm = props.sco.apiConnected;
  const [load, setLoad] = useState(false);
  const [newSuspendData, setNewSuspendData] = useState([]);
  const [startPage, setStartPage] = useState(0);
  const [menuPages, setMenuPages] = useState([]);

  useEffect(() => {
    // loadScorm();

    if (props.sco && isScorm && !load) {
      if (props.sco.suspendData.menu) { setNewSuspendData(props.sco.suspendData.menu); }
      if (props.sco.suspendData.paginaInicial) { setStartPage(props.sco.suspendData.paginaInicial); }
      setLoad(true)
    } else if (!load) {
      const strData = window.sessionStorage.getItem('cmi.suspend_data');
      let splitData = JSON.parse(strData);
      
      if (splitData !== null) { 
        setNewSuspendData(splitData.menu); 
        setMenuPages(splitData.menu);

        if (splitData.menu !== 0) {
          newCounter = Number(0);
          splitData.menu.forEach(obj => { if (obj === 1) newCounter++; })
          if (newCounter > splitData.paginaInicial) {
            setStartPage(newCounter);
          } else {
            setStartPage(splitData.paginaInicial);    
          }
        }
      }

      setLoad(true)
    }

    if (load) {
      loadData();
    }
  }, [isScorm, load, startPage, menuPages]);

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

    // if (newSuspendData.length !== 0) {
    //   newCounter = Number(0);
    //   newSuspendData.forEach(obj => { if (obj === 1) newCounter++; })
    //   setStartPage(newCounter)
    // }
    
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
