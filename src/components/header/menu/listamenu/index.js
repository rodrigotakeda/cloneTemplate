// Css
import "./index.scss";

// React Elements/Hooks
import GlobalState from "../../../../contexts/globalState";
import { Fragment, useEffect, useState, useContext } from "react";
import { withScorm } from "react-scorm-provider";
import LinkTravado from "../linktravado";

import SaveScorm from "../../../scorm/saveScorm";

function ListaMenu(props) {
  // passe um valor de elemento de lista em tagElement pra setar as tags <ol>,<li>
  let TagElement = props.tagElement;
  //const [currentClass, setCurrentClass] = useState('');
  let currentClass = "";
  const [dataChanged, setDataChanged] = useState(false);
  const [travaComplete, setTravaComplete] = useState(false);
  const [scormSaved, setScormSaved] = useState(false);
  // let newData = [];
  const [load, setLoad] = useState(false);
  const [changeMenu, setChangeMenu] = useState(false);
  const [endScroll, setEndScroll] = useState(false);
  const isScorm = props.sco.apiConnected;

  const [listItens, setListItens] = useState([]);
  const [newSuspendData, setNewSuspendData] = useState([]);

  const { menuPages, setMenuPages } = useContext(GlobalState);

  useEffect(() => {
    if (menuPages.length === 0) {
      setNewSuspendData(
        props.listItens.map(() => {
          return 0;
        })
      );
    } else {
      setNewSuspendData(menuPages);
    }

    setLoad(true);
  }, [isScorm, menuPages, props.listItens]);

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
    if (load && newSuspendData !== "") {
      if (props.tipoMenu === "onepage") {
        setListItens(
          props.listItens.map((list, id) => {
            if (isScorm) {
              if (props.lastVisited[id] === 1) {
                currentClass = "";
                newSuspendData[id] = 1;
                if (id === props.menuAtivo) {
                  currentClass = "active";
                }
              } else {
                currentClass = "travado";
              }
            } else {
              if (props.lastVisited[id] === 1) {
                currentClass = "";
                newSuspendData[id] = 1;
                if (id === props.menuAtivo) {
                  currentClass = "active";
                }
              } else {
                currentClass = "travado";
              }
            }

            return (
              <li
                key={id}
                onClick={(e) => props.onClick(e)}
                // className={`${ props.menuAtivo===id ? "active" : ""}`}
                className={currentClass}
                // data-seen={dataSeen}
                data-top={list.menu}
              >
                {list.content}
              </li>
            );
          })
        );
      } else {
        if (!changeMenu) {
          setListItens(
            props.listItens.map((list, id) => {
              if (newSuspendData[id] === 1) {
                currentClass = "";
                if (id === props.itemVisited) {
                  currentClass = "active";
                }
              } else if (id === props.itemVisited) {
                currentClass = "active";
              } else {
                currentClass = "travado";
              }

              return (
                <li key={id} className={currentClass}>
                  <LinkTravado
                    content={list.content}
                    link={list.route}
                    trava={currentClass}
                  />
                </li>
              );
            })
          );
          setChangeMenu(true);
        }
      }

      if (props.tipoMenu === "onepage") {
        if (isScorm) {
          props.sco.setSuspendData("menu", newSuspendData);
        } else {
          window.sessionStorage.setItem("menu", newSuspendData);
        }

        if (props.bottomReached && !endScroll) {
          let newArr = [...newSuspendData];
          newArr.forEach((obj) => {
            obj = 1;
          });
          props.sco.setSuspendData("menu", newArr);

          if (isScorm) {
            props.sco.setStatus("completed");
          } else {
            window.sessionStorage.setItem("status", "completed");
          }

          setEndScroll(true);
        }
      } else {
        if (props.bottomReached && !endScroll) {
          let newData_Items = [...newSuspendData];
          let newData_fromItem = newData_Items[props.itemVisited];
          newData_fromItem = 1;
          newData_Items[props.itemVisited] = newData_fromItem;

          console.log(props.bottomReached);
          let newCounter = Number(0);
          newData_Items.forEach((obj) => {
            if (obj === 1) newCounter++;
          });

          // if(isScorm) {
          //   props.sco.setSuspendData("menu", newData_Items);
          //   if (newCounter === newData_Items.length)
          // } else {
          //   window.sessionStorage.setItem('menu', JSON.stringify(newData_Items));
          //   if (newCounter === newData_Items.length) window.sessionStorage.setItem('status', 'completed');
          // }

          if (newCounter !== newData_Items.length) {
            let newList_Items = [...listItens];
            let newItem_fromList = { ...newList_Items[props.itemVisited + 1] };

            newItem_fromList = (
              <li key={props.itemVisited + 1} className={""}>
                <LinkTravado
                  content={props.listItens[props.itemVisited + 1].content}
                  link={props.listItens[props.itemVisited + 1].route}
                  trava={""}
                />
              </li>
            );

            newList_Items[props.itemVisited + 1] = newItem_fromList;
            setListItens(newList_Items);

            if (!dataChanged) {
              console.log("Menu_Data: ", newData_Items);
              setMenuPages(newData_Items);
              setDataChanged(true);
            } else {
              console.log("Menu: ", menuPages);
              setScormSaved(true);
            }
          } else if (newCounter === newData_Items.length && !travaComplete) {
            setScormSaved(true);
            console.log("Completed");
            isScorm && props.sco.setStatus("completed");
            setTravaComplete(true);
          }
        }
      }
    }
  }, [load, changeMenu, props, endScroll, newSuspendData, travaComplete]);

  // let dadosGravados = props.sco.getSuspendData("menu");
  // props.sco.setSuspendData("menu", newSuspendData);
  if (props.tipoMenu === "onepage") {
    return (
      <Fragment>
        <SaveScorm />
        <TagElement className={`list ${props.className}`}>
          {listItens}
        </TagElement>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {dataChanged && !scormSaved && <SaveScorm />}
        <TagElement className={`list ${props.className}`}>
          {listItens}
        </TagElement>
      </Fragment>
    );
  }
}

export default withScorm()(ListaMenu);
