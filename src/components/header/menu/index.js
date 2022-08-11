// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import { Container, Row, Col } from "react-bootstrap";
import List from "../../texts/lists";

function Menu(props) {
  useEffect(() => {
    document.body.classList.toggle("overflow", props.menuIsOpen);
  }, [props.menuIsOpen]);

  return (
    <nav
      className={`navComponent ${props.className} ${
        props.menuIsOpen ? "menu-aberto" : ""
      }`}
    >
      <Container>
        <Row>
          <Col>
            <div className="conteudoMenu">
              <List
                tagElement="ul"
                className="ulMenu"
                listItens={props.pagesData.curso.conteudo.telas}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <div className="menuBG"></div>
    </nav>
  );
}

export default Menu;
