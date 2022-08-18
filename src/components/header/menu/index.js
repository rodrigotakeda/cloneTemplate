// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { Container, Row, Col } from "react-bootstrap";
import List from "../../texts/lists";
// import BotaoMenu from "./menu/botaomenu";

function Menu(props) {
  const [menuListTop, setMenuListTop] = useState([]);
  const [load, setLoad] = useState(false);
  const menuList = Array.apply(null,document.querySelectorAll('section'));
  const [currentMenuAtual, setCurrentMenuAtual] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("overflow", props.menuIsOpen);
  }, [props.menuIsOpen]);

  useEffect(() => {   
    setMenuListTop(menuList.map((menuItem, id) => {
      return { menu: menuItem.offsetTop, content: menuItem.getAttribute('data-secao'), index: id }
    }))  
    setLoad(true)
  },[load]);

  function clickMenu(e) {
    props.setMenuIsOpen(!props.menuIsOpen)
    let scrollTo = e.target.getAttribute('data-top');
    window.scrollTo({
      top: scrollTo - 30,
      behavior: 'smooth',
    });
    // e.target.className = `${ props.className ? "" : "active"}`;
    
    const menuClicked = this.listItens.find(obj => { return Number(obj.menu) === Number(scrollTo); });
    setCurrentMenuAtual(menuClicked.index);
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
