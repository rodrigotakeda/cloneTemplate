// Css
import "./index.scss";

// React Elements/Hooks
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withScorm } from "react-scorm-provider";

function List(props) {
  // passe um valor de elemento de lista em tagElement pra setar as tags <ol>,<li>
  let TagElement = props.tagElement;
  //const [currentClass, setCurrentClass] = useState('');
  let currentClass = '';
  const isScorm = props.sco.apiConnected;
  
  // console.log(isScorm);
  console.log(props.sco.suspendData);
  // if (isScorm) props.sco.setSuspendData("menu", [props.lastVisited);

  const listItens = props.listItens.map((list, id) => {
    // passe um anchor para criar uma lista com links
    // setCurrentClass('');
    
    if (list.anchor) {
      return (
        <li key={id} className={list.className}>
          <a href={list.anchor} target="_blank" rel="noreferrer">
            {list.content}
          </a>
        </li>
      );
    }

    // passe um anchor para criar uma lista com rotas
    if (list.route) {
      return (
        <li key={id} className={list.className}>
          <Link to={`/${list.route}`}>{list.titulo}</Link>
        </li>
      );
    }

    // 
    if (list.menu) {

      if(isScorm) {
        if (props.lastVisited[id] === 1) {
          currentClass = '';
          if(id === props.menuAtivo) { currentClass = 'active'; }
        } else {
          currentClass = 'travado';
        }
      } else {
        currentClass = '';
        if(id === props.menuAtivo) { currentClass = 'active'; }
      }
      
      return (
        <li 
          key={id}
          onClick={(e) => props.onClick(e)} 
          // className={`${ props.menuAtivo===id ? "active" : ""}`} 
          className={currentClass} 
          // data-seen={dataSeen}
          data-top={list.menu}>
            {list.content}
        </li>
      );
    }

    return (
      <li
        key={id}
        className={list.className}
        onClick={(e) => props.onClick(e)}
        attribute={list.attribute && list.attribute}
      >
        {list.content}
      </li>
    );
  });
  return (
    <TagElement className={`list ${props.className}`}>{listItens}</TagElement>
  );
}

export default withScorm()(List);
