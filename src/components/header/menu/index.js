// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
import GlobalState from "../../../contexts/globalState";

// Components
import { Container, Row, Col } from "react-bootstrap";
import List from "../../texts/lists";
// import BotaoMenu from "./menu/botaomenu";

function Menu(props) {
  const [menuListTop, setMenuListTop] = useState([]);
  const [load, setLoad] = useState(false);
  const menuList = Array.apply(null,document.querySelectorAll('section'));
  const [currentMenuAtual, setCurrentMenuAtual] = useState(0);
  const { menuScrolled, setMenuScrolled } = useContext(GlobalState);

  useEffect(() => {
    document.body.classList.toggle("overflow", props.menuIsOpen);
  }, [props.menuIsOpen]);

  useEffect(() => {
    scrollMenu();
    window.addEventListener("scroll", scrollMenu);

    return () => {
      window.removeEventListener("scroll", scrollMenu);
    };
  }, [menuScrolled]);

  function scrollMenu() {
    setCurrentMenuAtual(menuScrolled);
  }

  useEffect(() => {
    setMenuListTop(menuList.map((menuItem, id) => {
      return { menu: menuItem.offsetTop, content: menuItem.getAttribute('data-secao'), index: id }
    }))
    setLoad(true)
    
  },[load]);

  function clickMenu(e) {
    if (e.target.className === "travado") return;
    
    props.setMenuIsOpen(!props.menuIsOpen)
    let scrollTo = e.target.getAttribute('data-top');
    window.scrollTo({
      top: scrollTo - 30,
      behavior: 'smooth',
    });
  }
 
  if(!load && menuListTop.length !== 0){
    return(
      <div>carregando</div>
    )
  } else {
    let menuRender;

    if(props.mode === "onepage"){
      menuRender = <List
        tagElement="ul"
        className="ulMenuOne"
        listItens={menuListTop}
        menuAtivo={currentMenuAtual}
        scormAtivo={props.menuIsScorm}
        onClick={clickMenu}
      />
    } else {
      menuRender = <List
        tagElement="ul"
        className="ulMenu"
        listItens={props.pagesData.curso.conteudo.telas}
      />
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
              <div className="conteudoMenu">
                { menuRender }
              </div>
            </Col>
          </Row>
        </Container>
  
        <div className="menuBG"></div>
      </nav>
    );
  }
 
}

export default Menu;
