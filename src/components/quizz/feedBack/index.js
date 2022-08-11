// Css
import "./index.scss";

// React Elements/Hooks
import { useState, Fragment, useEffect } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import FlexImgWithText from "../../images/flexImgWithText";
import Title from "../../texts/title";
import TextBlock from "../../texts/text_block";

//Imagens

//Functions
import setBreakPoint from "../../../globalFunctions/setBreakPoint";
import debounceTimeOut from "../../../globalFunctions/debounceTimeOut";

function FeedBack(props) {
  const [load, setLoad] = useState(false);
  const [breakResponsive, setBreakResponsive] = useState(false);

  useEffect(() => {
    if (props.feedBackItems != "") {
      if (props.feedBackItems.images) {
        ajustBreakContentResponsive(props.feedBackItems.images.imgSide);
      }
      setLoad(true);
    }
  }, [props.feedBackItems]);

  // atualiza no resize
  useEffect(() => {
    if (props.feedBackItems != "" && props.feedBackItems.images) {
      const debouncedHandleResize = debounceTimeOut(function handleResize() {
        ajustBreakContentResponsive(props.feedBackItems.images.imgSide);
      }, 500);

      window.addEventListener("resize", debouncedHandleResize);
      return () => {
        window.removeEventListener("resize", debouncedHandleResize);
      };
    }
  }, [window.innerWidth, props.feedBackItems]);

  function ajustBreakContentResponsive(imgSide) {
    //seta a classe de break, quando o feedBack fica na versao tablet/mobile
    if (window.innerWidth <= setBreakPoint(props.breakContent)) {
      setBreakResponsive(true);
    } else {
      setBreakResponsive(false);
    }
  }

  const feedBackItems =
    load &&
    (props.feedBackItems.images ? (
      <div
        className={`relative bodyWithImg feedback-wrapper ${
          breakResponsive ? "break" : ""
        } ${
          props.feedBackItems.images.imgSide === "fullLeft"
            ? "fullLeft"
            : props.feedBackItems.images.imgSide === "left"
            ? "left"
            : props.feedBackItems.images.imgSide === "right"
            ? "right"
            : props.feedBackItems.images.imgSide === "fullRight"
            ? "fullRight"
            : props.feedBackItems.images.imgSide === "bottom"
            ? "bottom"
            : props.feedBackItems.images.imgSide === "top"
            ? " top"
            : props.feedBackItems.images.imgSide === "fullBottom"
            ? "fullBottom"
            : props.feedBackItems.images.imgSide === "fullTop"
            ? "fullTop"
            : ""
        }  ${props.typeFeed} ${!props.showFeed ? "hideFeed" : ""}
    `}
      >
        <FlexImgWithText
          rowClasses={`${props.feedBackItems.images.rowClasses}`}
          typeH={props.feedBackItems.title.tagTitle}
          titleClassName={props.feedBackItems.title.titleClassName}
          title={props.feedBackItems.title.titleContent}
          textsBlock={props.feedBackItems.contents.textBlocks}
          imgSide={props.feedBackItems.images.imgSide}
          imgUrl={props.feedBackItems.images.imgUrl}
          imgUrlBreak={props.feedBackItems.images.imgUrlBreak}
          imgClassName={props.feedBackItems.images.imgClassName}
          colXs={props.feedBackItems.images.colXs}
          colSm={props.feedBackItems.images.colSm}
          colMd={props.feedBackItems.images.colMd}
          colLg={props.feedBackItems.images.colLg}
          colXl={props.feedBackItems.images.colXl}
          colXXl={props.feedBackItems.images.colXXl}
          isFeedBack={true}
          showFeed={props.showFeed}
          breakContent={props.breakContent} // parametro obrigatório, você deve definir em qual breakpoint o elemento vai quebrar e ficar vertical. Passe "sm","md","lg","xl","xxl".
        />
      </div>
    ) : (
      <div
        className={`feedback-wrapper ${props.typeFeed} ${
          !props.showFeed ? "hideFeed" : ""
        }`}
      >
        <div className="p-notImg">
          <Title
            typeH={props.feedBackItems.title.tagTitle}
            className={props.feedBackItems.title.titleClassName}
            content={
              <Fragment>{props.feedBackItems.title.titleContent}</Fragment>
            }
          />

          <TextBlock textsBlock={props.feedBackItems.contents.textBlocks} />
        </div>
      </div>
    ));
  if (!load) {
    return <Fragment> </Fragment>;
  } else {
    return <Fragment>{feedBackItems}</Fragment>;
  }
}

export default FeedBack;
