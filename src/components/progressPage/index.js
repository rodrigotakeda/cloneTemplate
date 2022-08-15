// Css
import "./index.scss";

// React Elements/Hooks
import { useState, useEffect } from "react";

// Functions
import calcPercentage from "../../globalFunctions/generalCalcs/calcPercentage";
import { Fragment } from "react/cjs/react.production.min";
import {ScoLearner} from "../scormComplete"

function ProgressPage(props) {
  // none, onlyText, textBar, perSection
  const [widthBar, setWidthBar] = useState(0);
  const [lastWidthBar, setLastWidthBar] = useState(0);
  const [endPosition, setEndPosition] = useState(false);

  // const [menuListTop, setMenuListTop] = useState([]);
  // const sectionRef = useRef(null);

  useEffect(() => {
    // let menuList = Array.apply(null,document.querySelectorAll('[menuoption]'))
    // setMenuListTop(menuList.map((menuItem, id) => {
    //   return( menuItem.offsetTop )
    // }))
    
    window.addEventListener("scroll", scrollPoint);

    return () => {
      window.removeEventListener("scroll", scrollPoint);
    };
  }, [lastWidthBar]);

  //VarLearner();
 
  function scrollPoint() {
    let scrollHeight = window.pageYOffset + window.innerHeight;
    let scrollPosition = document.documentElement.scrollHeight;

    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
      setEndPosition(true);
    }

    if (endPosition) {
      //{() => props.sco.setStatus('completed')}
      
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

  const scoDiv = ( endPosition && <ScoLearner/> )

  return (
    <Fragment>
      <div className={`progress ${props.className}`}>
        <div className="progressBar" style={{ width: `${widthBar}%` }}></div>

        <span>{widthBar}%</span>
      </div>
      {scoDiv}
    </Fragment>
  );  
}

export default ProgressPage;
