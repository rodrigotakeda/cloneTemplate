// React Elements/Hooks
import { useState, Fragment } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import BlocoVoltarAvancar from "./blocoVoltarAvancar";

//Imagens

function BotoesNavegacao(props) {
  return (
    <Row className="align-items-center mt-lg-5 mt-3 ">
      <Col className="d-flex justify-content-center align-items-center mt-lg-5 mt-3 relative">
        <BlocoVoltarAvancar />
      </Col>
    </Row>
  );
}

export default BotoesNavegacao;
