// Css
import "./index.scss";

// React Elements/Hooks
import GlobalState from "../../contexts/globalState";
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Components
import { Container, Row, Col, Form } from "react-bootstrap";
import BotaoMenu from "./menu/botaomenu";
import Menu from "./menu";

function Header(props) {
  const headerInitialPos = { top: "0" };
  const [headerStyle, setHeaderStyle] = useState(headerInitialPos);
  const [showHeader, setShowHeader] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const headerRef = useRef(null);
  const { pagesData } = useContext(GlobalState);

  let prevScrollpos = window.pageYOffset;

  useEffect(() => {
    if (props.hideOnScroll) {
      window.addEventListener("scroll", hideOnScroll);
      return () => {
        window.removeEventListener("scroll", hideOnScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (props.hideOnScroll) {
      if (showHeader) {
        setHeaderStyle(headerInitialPos);
      } else {
        setHeaderStyle({ top: `${-headerRef.current.offsetHeight}px ` });
      }
    }
  }, [showHeader]);

  function hideOnScroll() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    prevScrollpos = currentScrollPos;
  }

  function handleThemeChange(e) {
    props.setTemaCor(e.target.value);
  }

  return (
    <header
      style={headerStyle}
      ref={headerRef}
      className={`headerComponent ${props.className}`}
    >
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs="2">
            <Link to="/">
              <img
                src={pagesData.curso.logo}
                className="img-responsive"
                alt="Logotipo da Empresa"
              />
            </Link>
          </Col>

          <Col xs="2">
            <Form.Select
              onChange={(e) => handleThemeChange(e)}
              aria-label="Default select example"
              id="changeTemplate"
            >
              <option value="custom">Custom</option>
              <option value="azulVerde">Padrão Azul / Verde</option>
              <option value="azulAmarelo">Padrão Azul / Amarelo</option>
              <option value="laranja">Padrão Laranja</option>
              <option value="verdeAreia">Padrão Verde / Areia</option>
            </Form.Select>
          </Col>

          <Col xs="2" className="d-flex justify-content-end">
            <BotaoMenu
              setMenuIsOpen={setMenuIsOpen}
              menuIsOpen={menuIsOpen}
              className=""
            />
          </Col>
        </Row>
      </Container>
      <Menu
        mode={pagesData.curso.mode}
        menuIsScorm={pagesData.curso.scorm}
        setMenuIsOpen={setMenuIsOpen}
        menuIsOpen={menuIsOpen}
        pagesData={pagesData}
        className=""
      />
    </header>
  );
}

export default Header;
