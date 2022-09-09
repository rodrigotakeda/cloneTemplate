// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
import GlobalState from "../../../contexts/globalState";

// Components
import { Container, Row, Col } from "react-bootstrap";
import ListaMenu from "./listamenu";
// import BotaoMenu from "./menu/botaomenu";

function Menu(props) {
  const [menuListTop, setMenuListTop] = useState([]);
  const [menuListPages, setMenuListPages] = useState([]);
  const [load, setLoad] = useState(false);
  let menuList = [];
  const [currentMenuAtual, setCurrentMenuAtual] = useState(0);
  const [currentAtivo, setCurrentAtivo] = useState(0);
  // const [lastItemViewed, setLastItemViewed] = useState(0);
  const { menuScrolled, setMenuScrolled } = useContext(GlobalState);
  const { endPosition, setEndPosition } = useContext(GlobalState);

  const [itemsViewed, setItemsViewed] = useState([]);

  useEffect(() => {
    document.body.classList.toggle("overflow", props.menuIsOpen);
  }, [props.menuIsOpen]);

  useEffect(() => {
    scrollMenu();
    window.addEventListener("scroll", scrollMenu);

    return () => {
      window.removeEventListener("scroll", scrollMenu);
    };
  }, [menuScrolled, endPosition, itemsViewed]);

  function scrollMenu() {
    if (props.mode === "onepage") {
      itemsViewed[menuScrolled] = 1;
      setCurrentMenuAtual(menuScrolled);
    }
  }

  useEffect(() => {
    if (props.mode === "onepage") {
      menuList = Array.apply(null, document.querySelectorAll("section"));
      setItemsViewed(
        menuList.map(() => {
          return 0;
        })
      );
      setMenuListTop(
        menuList.map((menuItem, id) => {
          return {
            menu: menuItem.offsetTop,
            content: menuItem.getAttribute("data-secao"),
            visited: menuItem.getAttribute("data-seen"),
            index: id,
          };
        })
      );
    } else {
      menuList = props.pagesData.curso.conteudo.telas;
      setMenuListPages(
        menuList.map((pageItem, id) => {
          return { route: pageItem.route, content: pageItem.titulo, index: id };
        })
      );

      let routePage =
        props.pagesData.curso.conteudo.telas[props.pageAtual - 1].route;
      setCurrentAtivo(routePage);
      setCurrentMenuAtual(
        props.pagesData.curso.conteudo.telas
          .map(function (e) {
            return e.route;
          })
          .indexOf(routePage)
      );
    }

    setLoad(true);
  }, [load]);

  function clickMenu(e) {
    if (e.target.className === "travado") return;

    props.setMenuIsOpen(!props.menuIsOpen);
    let scrollTo = e.target.getAttribute("data-top");
    window.scrollTo({
      top: scrollTo - 30,
      behavior: "smooth",
    });
  }

  if (!load && menuListTop.length !== 0) {
    return <div>carregando</div>;
  } else {
    let menuRender;

    if (props.mode === "onepage") {
      menuRender = (
        <ListaMenu
          tagElement="ul"
          tipoMenu="onepage"
          className="ulMenuOne"
          bottomReached={endPosition}
          listItens={menuListTop}
          menuAtivo={currentMenuAtual}
          lastVisited={itemsViewed}
          onClick={clickMenu}
        />
      );
    } else {
      // console.log("Menu", props.pageAtual)
      menuRender = (
        <ListaMenu
          tagElement="ul"
          tipoMenu="multipage"
          className="ulMenu"
          bottomReached={endPosition}
          listItens={menuListPages}
          menuAtivo={currentAtivo}
          itemVisited={currentMenuAtual}
        />
      );
    }

    return (
      <nav
        className={`navComponent ${props.className} ${
          props.menuIsOpen ? "menu-aberto" : ""
        }`}
      >
        <Container>
          <Row>
            <Col>
              <div className="conteudoMenu">{menuRender}</div>
            </Col>
          </Row>
        </Container>

        <div className="menuBG"></div>
      </nav>
    );
  }
}

export default Menu;
