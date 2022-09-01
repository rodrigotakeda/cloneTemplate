// React Elements/Hooks
import { useState, Fragment } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import NextScreen from "../../../../../components/buttons/nextScreen";

//Imagens

function BlocoVoltarAvancar(props) {
  // passe para o middleItem, algum texto que você queira que fique entre os dois números
  return (
    <Fragment>
      <NextScreen className="mt-lg-5 mt-3" size="lg" />
    </Fragment>
  );
}

export default BlocoVoltarAvancar;
