// Css
import "./index.scss";

// React Elements/Hooks
import { useState, Fragment } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";

//Imagens

function Btn(props) {
  return (
    <Button className={` ${props.className ? props.className : ""}`} {...props}>
      {props.children}
    </Button>
  );
}

export default Btn;
