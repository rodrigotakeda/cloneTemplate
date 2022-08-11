// Css
import "./index.scss";

// React Elements/Hooks
import { useState, Fragment, useEffect } from "react";

// Components
import SvgInterativo from "../svgInterativo";

function SvgParallax(props) {
  return (
    <div className="svgParallax" ref={props.parallaxRef}>
      <SvgInterativo
        className="svgParallax"
        svgName={props.svgName}
        isParallaxSvg={true}
      />
    </div>
  );
}

export default SvgParallax;
