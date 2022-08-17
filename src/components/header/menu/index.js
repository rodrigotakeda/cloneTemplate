// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { Container, Row, Col } from "react-bootstrap";
import List from "../../texts/lists";

function Menu(props) {
  const [menuListTop, setMenuListTop] = useState([]);
  const [load, setLoad] = useState(false);
  const menuList = Array.apply(null,document.querySelectorAll('section'));

  useEffect(() => {
    document.body.classList.toggle("overflow", props.menuIsOpen);
  }, [props.menuIsOpen]);

  useEffect(() => {   
    // const menuList = new Map()
    // setMenuListTop(menuList.map((menuItem, id) => {   
    //   menuItem.set('content', menuItem.getAttribute('data-secao'))
    //   return( menuItem )
    // }))  
      setLoad(true)
  },[load]);


  // useEffect(() => {
  //   console.log(props.mode,menuListTop.length,load)
  //   if(props.mode == "onepage"){
  //     if(menuListTop.length !== 0){
  //       // criaMenu();
  //       // setLoad(true)
  //     } 
  //   }  
 
  // },[load]);


  console.log(menuListTop)
  
  if(!load && menuListTop.length !== 0){
    return(
      <div>carregando</div>
    )
  }else{
    return (
      <nav
        className={`navComponent ${props.className} ${
          props.menuIsOpen ? "menu-aberto" : ""
        }`}
      >
        <Container>
          <Row>
            <Col>
              <span>{menuListTop}</span>
              <div className="conteudoMenu">
                {/* <List
                  tagElement="ul"
                  className="ulMenu"
                  listItens={props.pagesData.curso.conteudo.telas}
                /> */}
  
                <List
                  tagElement="ul"
                  className="ulMenu"
                  listItens={menuListTop}
                />
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
