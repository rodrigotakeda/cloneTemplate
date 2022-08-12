import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useEffect, useContext } from "react";
import Page1 from "./screens/page1";
import Quizz from "./screens/quizz";

import GlobalState from "./contexts/globalState";

function ScreenRoutes(props) {
  const pagesArray = [Page1, Quizz]; // adicione as chamadas de pagina desse array
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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
    </BrowserRouter>
  );
}

export default ScreenRoutes;
