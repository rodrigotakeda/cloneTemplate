// Css
import "./index.scss";

// React Elements/Hooks
import { useEffect, useState } from "react";
import { withScorm } from "react-scorm-provider";

function ListaMenu(props) {
  // passe um valor de elemento de lista em tagElement pra setar as tags <ol>,<li>
  let TagElement = props.tagElement;
  //const [currentClass, setCurrentClass] = useState('');
  let currentClass = '';
  // let newData = [];
  const [load, setLoad] = useState(false);
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
          if (props.lastVisited[id] === 1) {
            currentClass = '';
            newSuspendData[id] = 1;
            if(id === props.menuAtivo) { currentClass = 'active'; }
          } else {
            currentClass = 'travado';
          }
        } else {
          currentClass = '';
          if (props.lastVisited[id] === 1) {
            newSuspendData[id] = 1;
          }
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
      }));

      // console.log(newSuspendData)
      props.sco.setSuspendData("menu", newSuspendData);
    }
  },[load, props.menuAtivo, newSuspendData]);


  // console.log(newState);

  // let dadosGravados = props.sco.getSuspendData("menu");
  
  // props.sco.setSuspendData("menu", newSuspendData);

  return (
    <TagElement className={`list ${props.className}`}>{listItens}</TagElement>
  );
}

export default withScorm()(ListaMenu);
