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

  useEffect(() => {
    if (load && newSuspendData !== "") {
      if (props.tipoMenu === "onepage") {
        if (!changeMenu) {
          setListItens(
            props.listItens.map((list, id) => {
              if (props.lastVisited[id] === 1) {
                currentClass = "";
                newSuspendData[id] = 1;
                if (id === props.menuAtivo) {
                  currentClass = "active";
                }
              } else {
                if (isScorm) {
                  currentClass = "travado";
                } else {
                  currentClass = "";
                }
              }

              return (
                <li
                  key={id}
                  onClick={(e) => props.onClick(e)}
                  className={currentClass}
                  data-top={list.menu}
                >
                  {list.content}
                </li>
              );
            })
          );
        }
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

                if (isScorm) {
                  currentClass = "travado";
                } else {
                  currentClass = "";
                }
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
        let newData_Items = [...newSuspendData];

        let newCounter = Number(0);
        newData_Items.forEach((obj) => {
          if (obj === 1) newCounter++;
        });

        // console.log(newCounter, newData_Items, endScroll, props.bottomReached)

        if (newCounter !== newData_Items.length) {
          if (!dataChanged) {
            setMenuPages(newData_Items);
            setDataChanged(true);
            setScormSaved(false);
          } else {
            setScormSaved(true);
            setDataChanged(false);
          }
        } else if (newCounter === newData_Items.length && props.bottomReached && !endScroll) {
          setMenuPages(newData_Items);
          setScormSaved(true);
          isScorm && props.sco.setStatus("completed");
          console.log("Completed");
          setEndScroll(true);
        }
      } else {
        console.log('Bottom:', props.bottomReached)
        if (props.bottomReached && !endScroll) {
          let newData_Items = [...newSuspendData];
          let newData_fromItem = newData_Items[props.itemVisited];
          newData_fromItem = 1;
          newData_Items[props.itemVisited] = newData_fromItem;

          let newCounter = Number(0);
          newData_Items.forEach((obj) => {
            if (obj === 1) newCounter++;
          });

          if (newCounter !== newData_Items.length) {
            let newList_Items = [...listItens];
            let newItem_fromList = { ...newList_Items[props.itemVisited + 1] };

            if (!travaComplete) {
              newItem_fromList = (
                <li key={props.itemVisited + 1} className={""}>
                  <LinkTravado
                    content={props.listItens[props.itemVisited + 1].content}
                    link={props.listItens[props.itemVisited + 1].route}
                    trava={""}
                  />
                </li>
              );
            }

            newList_Items[props.itemVisited + 1] = newItem_fromList;
            setListItens(newList_Items);

            if (!dataChanged) {
              // console.log("Menu_Data: ", newData_Items);
              setMenuPages(newData_Items);
              setDataChanged(true);
            } else {
              console.log("Menu: ", menuPages);
              setScormSaved(true);
              setEndScroll(true);
            }
          } else if (newCounter === newData_Items.length && !travaComplete) {
            setMenuPages(newData_Items);
            setScormSaved(true);
            isScorm && props.sco.setStatus("completed");

            console.log("Completed");
            setTravaComplete(true);
          }
        }
      }
    }
  }, [load, changeMenu, props.bottomReached, props.menuAtivo, endScroll, newSuspendData, travaComplete]);

  // let dadosGravados = props.sco.getSuspendData("menu");
  // props.sco.setSuspendData("menu", newSuspendData);
  if (!load && newSuspendData.length === 0) {
    return <div>carregando</div>;
  } else {
    if (props.tipoMenu === "onepage") {
      // console.log('Data: ', dataChanged, ' - Scorm: ', scormSaved)
      // if (dataChanged && !scormSaved) console.log('Sco Saved')
      return (
        <Fragment>
          {dataChanged && !scormSaved && <SaveScorm />}
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
}

export default withScorm()(ListaMenu);
