// Css
import "./index.scss";

// React Elements/Hooks
import { useState, Fragment } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import Btn from "../../buttons";

//Imagens

function ButtonQuizz(props) {
  return (
    <Row className={`button-wrapper ${props.showButton ? "showButton" : ""}`}>
      <Col className="button-content ">
        <Btn
          className={`btn-padrao ${props.className ? props.className : ""}`}
          size="md"
          onClick={() => props.btnFunction()}
        >
          {props.content}
        </Btn>
      </Col>
    </Row>
  );
}

export default ButtonQuizz;
