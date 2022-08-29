// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect, useState } from "react";
import { withScorm } from "react-scorm-provider";
import LinkTravado from "../linktravado";

function ListaMenu(props) {
  // passe um valor de elemento de lista em tagElement pra setar as tags <ol>,<li>
  let TagElement = props.tagElement;
  //const [currentClass, setCurrentClass] = useState('');
  let currentClass = '';
  // let newData = [];
  const [load, setLoad] = useState(false);
  const [endScroll, setEndScroll] = useState(false);
  const isScorm = props.sco.apiConnected;
  
  const [listItens, setListItens] = useState([]);
  const [newSuspendData, setNewSuspendData] = useState([]);

  useEffect(() => {
    if (props.sco && isScorm && props.listItens != '') {
      if (props.sco.suspendData.menu) {
        console.log(props.sco.suspendData.menu)
        setNewSuspendData(props.sco.suspendData.menu);
      } else {
        console.log('ENTROU NO LIST')
        setNewSuspendData(props.listItens.map(() => { return 0; }));  
      }
      setLoad(true)
    } else if ( props.listItens != '') {
      // let sessionVal = window.sessionStorage.getItem('menu')
      if (window.sessionStorage.getItem('menu')) {
        setNewSuspendData(window.sessionStorage.getItem('menu'));
      } else {
        setNewSuspendData(props.listItens.map(() => { return 0; }));  
      }
      setNewSuspendData(props.listItens.map(() => { return 0; }));
      setLoad(true)
    }
  }, [isScorm, props.listItens]);

//   useEffect(() => {
//     const listItens = props.listItens.map((list, id) => {
//       if(isScorm) {  
//         if (props.lastVisited[id] === 1) {
//           currentClass = '';
//           // newSuspendData[id] = 1;

//           if(id === props.menuAtivo) { currentClass = 'active'; }
//         } else {
//           currentClass = 'travado';
//         }
//       } else {
//         currentClass = '';
//         if(id === props.menuAtivo) { currentClass = 'active'; }
//       }
      
//       return (
//         <li 
//           key={id}
//           onClick={(e) => props.onClick(e)} 
//           // className={`${ props.menuAtivo===id ? "active" : ""}`} 
//           className={currentClass} 
//           // data-seen={dataSeen}
//           data-top={list.menu}>
//             {list.content}
//         </li>
//       );
//     })
// },[]);
  
  useEffect(() => {
    // newData = [...newSuspendData];
    if (load && newSuspendData !== '') { 
      setListItens(props.listItens.map((list, id) => {
        if(isScorm) {
          if(props.tipoMenu === "onepage") {
            if (props.lastVisited[id] === 1) {
              currentClass = '';
              newSuspendData[id] = 1;
              if(id === props.menuAtivo) { currentClass = 'active'; }
            } else {
              currentClass = 'travado';
            }
          } else {
            if(newSuspendData[id] === 1) { 
              currentClass = '';
              if(id === props.itemVisited) { currentClass = 'active'; }
            } else if(id === props.itemVisited) { 
              newSuspendData[id] = 1;
              currentClass = 'active';
            } else {
              currentClass = 'travado';
            }
          }
        } else {
          if(props.tipoMenu === "onepage") {
            if (props.lastVisited[id] === 1) {
              currentClass = '';
              newSuspendData[id] = 1;
              if(id === props.menuAtivo) { currentClass = 'active'; }
            } else {
              currentClass = 'travado';
            }
          } else {
            if(newSuspendData[id] === 1) { 
              currentClass = '';
              if(id === props.itemVisited) { currentClass = 'active'; }
            } else if(id === props.itemVisited) { 
              newSuspendData[id] = 1;
              currentClass = 'active';
            } else {
              currentClass = 'travado';
            }
          }
        }

        if(props.tipoMenu === "onepage") {
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
        } else {
          return (
            <li
              key={id}
              className={currentClass} 
              >
              <LinkTravado
                content={list.content}
                link={list.route}
                trava={currentClass}
              />
            </li>
          );
        }
      }));

      if(isScorm) {
        props.sco.setSuspendData("menu", newSuspendData);
        if(props.tipoMenu === "onepage") {
          if (props.bottomReached && !endScroll) {
            let newArr = [...newSuspendData];
            newArr.forEach(obj => { obj = 1; })
            props.sco.setSuspendData("menu", newArr);
            props.sco.setStatus("completed");
            setEndScroll(true);
          }
        } else {
          let newCounter = Number(0);
          newSuspendData.forEach(obj => { if (obj === 1) newCounter++; })
          if (newCounter === newSuspendData.length) props.sco.setStatus("completed");
        }
      } else {
        if (props.bottomReached && !endScroll) {
          console.log('FIM')
          // window.sessionStorage.setItem('menu', newSuspendData);
          // setEndScroll(true);
        }
      }
    }
  },[load, props, endScroll, newSuspendData]);


  // console.log(newState);

  // let dadosGravados = props.sco.getSuspendData("menu");
  
  // props.sco.setSuspendData("menu", newSuspendData);

  return (
    <TagElement className={`list ${props.className}`}>{listItens}</TagElement>
  );
}

export default withScorm()(ListaMenu);
