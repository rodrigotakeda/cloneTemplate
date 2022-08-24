// Css
import "./index.scss";

// React Elements/Hooks
import { useState } from "react";
import { Link } from "react-router-dom";

function List(props) {
  // passe um valor de elemento de lista em tagElement pra setar as tags <ol>,<li>
  let TagElement = props.tagElement;
  const [currentClass, setCurrentClass] = useState('');

  const listItens = props.listItens.map((list, id) => {
    // passe um anchor para criar uma lista com links
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
      // console.log('BUUUUU')
      // useEffect(() => {
      //   
      // }, [currentClass]);

      if(props.scormAtivo) {
        if(props.menuAtivo === id) {
          // setCurrentClass('travado')
          console.log('Xis')
        }
      }

      return (
        <li 
          key={id}
          onClick={(e) => props.onClick(e)} 
          // className={`${ props.menuAtivo===id ? "active" : ""}`} 
          className={currentClass} 
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

export default List;
