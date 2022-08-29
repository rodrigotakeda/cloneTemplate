import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useEffect, useContext } from "react";
import Page1 from "./screens/page1";
import Page2 from "./screens/page2";
import Page3 from "./screens/page3";
import Page4 from "./screens/page4";

import GlobalState from "./contexts/globalState";

function ScreenRoutes(props) {
  const pagesArray = [Page1, Page2, Page3, Page4]; // adicione as chamadas de pagina desse array
  const { pagesData, setPagesData } = useContext(GlobalState);

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
            <Navigate to={`${pagesData.curso.conteudo.telas[0].route}`} />
          }
        />
        {allPages}
      </Routes>
    </HashRouter>
  );
}

export default ScreenRoutes;
