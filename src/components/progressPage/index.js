// Css
import "./index.scss";

// React Elements/Hooks
import { useState, useEffect, useContext } from "react";

// Functions
import calcPercentage from "../../globalFunctions/generalCalcs/calcPercentage";
import { Fragment } from "react/cjs/react.production.min";
import {ScoLearner} from "../scormComplete"
import GlobalState from "../../contexts/globalState";

function ProgressPage(props) {
  // none, onlyText, textBar, perSection
  const [widthBar, setWidthBar] = useState(0);
  const [lastWidthBar, setLastWidthBar] = useState(0);
  const [endPosition, setEndPosition] = useState(false);

  const [menuListTop, setMenuListTop] = useState([]);
  const [load, setLoad] = useState(false);

  // const [menuScrolled, setMenuScrolled] = useState(0);
  const { menuScrolled, setMenuScrolled } = useContext(GlobalState);
  const menuList = Array.apply(null,document.querySelectorAll('section'));

  useEffect(() => {
    window.addEventListener("scroll", scrollPoint);

    return () => {
      window.removeEventListener("scroll", scrollPoint);
    };
  }, [lastWidthBar, menuListTop, menuScrolled]);

  useEffect(() => {
    setMenuListTop(menuList.map((menuItem, id) => {
      return({ menu: menuItem.offsetTop, index: id })
    }))
    setLoad(true)
  },[load]);

  function scrollPoint() {
    let scrollHeight = window.pageYOffset + window.innerHeight;
    let scrollPosition = document.documentElement.scrollHeight;

    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
      setEndPosition(true);
    }

    let altPosition = window.pageYOffset;
    let numMaior = 0;
    menuListTop.forEach(obj => {
      if (Number(altPosition) >= obj.menu) { numMaior = obj.index; }
    })

    setMenuScrolled(numMaior)

    if (endPosition) {
      setEndPosition(false);
    } else {
      let barUpdated = calcPercentage(window.pageYOffset, (scrollPosition - window.innerHeight));

      if (props.progressType === "maxView") {
        if (barUpdated > lastWidthBar) {
          setWidthBar(barUpdated);
          setLastWidthBar(barUpdated);
        }
      } else {
        setWidthBar(barUpdated);
      }
    }
  }

  if(!load && menuListTop.length !== 0){
    return(
      <div>carregando</div>
    )
  } else {
    return (
      <Fragment>
        <div className={`progress ${props.className}`}>
          <div className="progressBar" style={{ width: `${widthBar}%` }}></div>

          <span>{widthBar}%</span>
        </div>
      </Fragment>
    ); 
  }
}

export default ProgressPage;
