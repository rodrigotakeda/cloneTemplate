// Css
import "./index.scss";

// React Elements/Hooks
import { Fragment } from "react";
import { useState, useRef, useEffect, memo } from "react";

// Components
import { Image } from "react-bootstrap";
import TextBlock from "../../texts/text_block";
import Title from "../../texts/title";
import { Row, Col, Form, Card } from "react-bootstrap";
import Check from "../../forms/check";

//function
import debounceTimeOut from "../../../globalFunctions/debounceTimeOut";

function FlexImgWithText(props) {
  //imgSide pode ser "top", "left", "bottom" ,"right" "fullRight" ou "fullLeft"
  const blocoTextoRef = useRef(null);
  const [imgStyle, setImgstyle] = useState({ height: "auto" });
  const [isImgFull, setIsImgFull] = useState(false);
  const [paddingCarousel, setPaddingCarousel] = useState(false);

  // atualiza caso alguma img do accordion seja full
  useEffect(() => {
    if (props.id === props.idAtual) {
      if (props.accordionIsImgFull) {
        setIsImgFull(true);
        setImgstyle({ height: `${blocoTextoRef.current.clientHeight + 50}px` });
      }
    }
  }, [props.idAtual]);

  // verifica se o carousel tem um break e aplica as configs
  useEffect(() => {
    if (props.breakResponsive) {
      if (props.imgSide === "fullTop" || props.imgSide === "fullBottom") {
        setPaddingCarousel(true);
      }
      if (props.imgSide === "fullLeft" || props.imgSide === "fullRight") {
        setIsImgFull(true);
        setTimeout(() => {
          setImgstyle({
            height: `${blocoTextoRef.current.clientHeight + 50}px`,
          });
        }, 1);
      }
    }
  }, [props.breakResponsive]);

  // aplica a classe de paddigns se o carousel tiver imgs full
  useEffect(() => {
    let carouselId = props.carouselId == undefined ? 0 : props.carouselId;

    if (carouselId === props.carouselIidAtual) {
      if (props.carouselIsImgFullVertical) {
        setPaddingCarousel(true);
      }
      if (props.carouselIsImgFullHorizontal) {
        setPaddingCarousel(props.ajustCarouselPaddingResponsive(props.imgSide));
        setIsImgFull(true);

        setTimeout(() => {
          setImgstyle({
            height: `${blocoTextoRef.current.clientHeight + 50}px`,
          });
        }, 1);
      }
    }
  }, [props.clickCarousel, props.isFirstFull]);

  // atualiza caso alguma img da tab seja full
  useEffect(() => {
    if (props.tabIsImgFull) {
      setIsImgFull(true);
      setImgstyle({ height: `${blocoTextoRef.current.clientHeight + 50}px` });
    } else if (!props.tabIsImgFull) {
      setIsImgFull(false);
      setImgstyle({ height: "auto" });
    }
  }, [props.clickTab]);

  // atualiza caso alguma questao do quizz seja img full
  useEffect(() => {
    if (props.questionIsImgFull) {
      setIsImgFull(true);
      setTimeout(() => {
        setImgstyle({
          height: `${blocoTextoRef.current.clientHeight + 50}px`,
        });
      }, 1);
    } else if (!props.questionIsImgFull) {
      setIsImgFull(false);
      setImgstyle({ height: "auto" });
    }
  }, [props.questionIsImgFull, props.questionCounter]);

  // atualiza caso alguma alternativa do quizz seja img full
  useEffect(() => {
    if (props.answerIsImgFull) {
      setIsImgFull(true);
      setTimeout(() => {
        setImgstyle({
          height: `${blocoTextoRef.current.clientHeight + 50}px`,
        });
      }, 1);
    } else if (!props.answerIsImgFull) {
      setIsImgFull(false);
      setImgstyle({ height: "auto" });
    }
  }, [props.answerIsImgFull, props.questionCounter]);

  // atualiza quando carrega a pagina
  useEffect(() => {
    if (props.imgSide === "fullLeft" || props.imgSide === "fullRight") {
      setIsImgFull(true);
      setImgstyle({ height: `${blocoTextoRef.current.clientHeight + 50}px` });
    }
    if (props.imgSide === "fullTop" || props.imgSide === "fullBottom") {
      setIsImgFull(true);
    }
    if (props.isCarousel) {
      setPaddingCarousel(props.ajustCarouselPaddingResponsive(props.imgSide));
    }
  }, []);

  // atualiza no resize
  useEffect(() => {
    if (
      isImgFull &&
      !(props.imgSide === "fullTop" || props.imgSide === "fullBottom")
    ) {
      const debouncedHandleResize = debounceTimeOut(function handleResize() {
        setImgstyle({ height: `${blocoTextoRef.current.clientHeight + 50}px` });
        if (props.isCarousel) {
          setPaddingCarousel(
            props.ajustCarouselPaddingResponsive(props.imgSide)
          );
        }
      }, 500);

      window.addEventListener("resize", debouncedHandleResize);
      return () => {
        window.removeEventListener("resize", debouncedHandleResize);
      };
    }
  }, [window.innerWidth, isImgFull]);

  return (
    <Row
      className={`flexImgWithText ${props.rowClasses} ${
        isImgFull ? "imgFull" : "notImgFull"
      } `}
    >
      <Col
        xs={`${
          props.imgSide === "top" ||
          props.imgSide === "bottom" ||
          props.imgSide === "fullTop" ||
          props.imgSide === "fullBottom" ||
          props.breakContent === "sm" ||
          props.breakContent === "md" ||
          props.breakContent === "lg" ||
          props.breakContent === "xl" ||
          props.breakContent === "xxl"
            ? "12"
            : props.colXs
            ? props.colXs
            : ""
        }`}
        sm={`${
          props.imgSide === "top" ||
          props.imgSide === "bottom" ||
          props.imgSide === "fullTop" ||
          props.imgSide === "fullBottom" ||
          props.breakContent === "md" ||
          props.breakContent === "lg" ||
          props.breakContent === "xl" ||
          props.breakContent === "xxl"
            ? "12"
            : props.colSm
            ? props.colSm
            : ""
        }`}
        md={`${
          props.imgSide === "top" ||
          props.imgSide === "bottom" ||
          props.imgSide === "fullTop" ||
          props.imgSide === "fullBottom" ||
          props.breakContent === "lg" ||
          props.breakContent === "xl" ||
          props.breakContent === "xxl"
            ? "12"
            : props.colMd
            ? props.colMd
            : ""
        }`}
        lg={`${
          props.imgSide === "top" ||
          props.imgSide === "bottom" ||
          props.imgSide === "fullTop" ||
          props.imgSide === "fullBottom" ||
          props.breakContent === "xl" ||
          props.breakContent === "xxl"
            ? "12"
            : props.colLg
            ? props.colLg
            : ""
        }`}
        xl={`${
          props.imgSide === "top" ||
          props.imgSide === "bottom" ||
          props.imgSide === "fullTop" ||
          props.imgSide === "fullBottom" ||
          props.breakContent === "xxl"
            ? "12"
            : props.colXl
            ? props.colXl
            : ""
        }`}
        xxl={`${
          props.imgSide === "top" ||
          props.imgSide === "bottom" ||
          props.imgSide === "fullTop" ||
          props.imgSide === "fullBottom"
            ? "12"
            : props.colXXl
            ? props.colXXl
            : ""
        }`}
        className={`${
          props.breakContent
            ? props.imgSide === "top"
              ? `order-${props.breakContent}-1 px-0 px-${props.breakContent}-4 mb-3`
              : props.imgSide === `fullTop`
              ? `order-${props.breakContent}-1 px-0 mb-3`
              : props.imgSide === `left`
              ? `order-${props.breakContent}-1 px-0 px-${props.breakContent}-4 mb-3 mb-${props.breakContent}-0`
              : props.imgSide === `fullLeft`
              ? `order-${props.breakContent}-1 px-0 mb-3 mb-${props.breakContent}-0`
              : props.imgSide === `right`
              ? `order-${props.breakContent}-2 px-0 px-${props.breakContent}-4 mb-3 mb-${props.breakContent}-0`
              : props.imgSide === `fullRight`
              ? `order-${props.breakContent}-2 px-0 mb-3 mb-${props.breakContent}-0`
              : props.imgSide === `bottom`
              ? `order-2 px-0 px-${props.breakContent}-4 mt-3`
              : props.imgSide === `fullBottom`
              ? `order-2 px-0 mt-3`
              : ""
            : props.imgSide === "top"
            ? "order-1 px-0 px-4 mb-3"
            : props.imgSide === "fullTop"
            ? "order-1 px-0 mb-3"
            : props.imgSide === "left"
            ? "order-1 px-0 px-4 mb-3 mb-0"
            : props.imgSide === "fullLeft"
            ? "order-1 px-0 mb-3 mb-0"
            : props.imgSide === "right"
            ? "order-2 px-0 px-4 mb-3 mb-0"
            : props.imgSide === "fullRight"
            ? "order-2 px-0 mb-3 mb-0"
            : props.imgSide === "bottom"
            ? "order-2 px-0 px-4 mt-3"
            : props.imgSide === "fullBottom"
            ? "order-2 px-0 mt-3"
            : ""
        }`}
      >
        {/* caso seja um card horizontal ele entra aqui */}
        {props.isCard ? (
          props.setImgCard(imgStyle)
        ) : (
          <Fragment>
            <Image
              style={imgStyle}
              src={props.imgUrl}
              className={`mx-auto d-none d-${
                props.breakContent ? `${props.breakContent}-` : ""
              }block ${props.imgClassName ? props.imgClassName : ""}`}
              loading="lazy"
              alt=""
              fluid={!isImgFull}
            />
            <Image
              src={props.imgUrlBreak}
              className={`mx-auto d-block d-${
                props.breakContent ? `${props.breakContent}-` : ""
              }none mb-lg-0 ${props.imgClassName ? props.imgClassName : ""}`}
              loading="lazy"
              alt=""
              fluid
            />
          </Fragment>
        )}
      </Col>
      <Col
        className={`${
          props.breakContent
            ? props.imgSide === "left" ||
              props.imgSide === "top" ||
              props.imgSide === "fullTop" ||
              props.imgSide === "fullLeft"
              ? `order-${props.breakContent}-2`
              : props.imgSide === "right" || props.imgSide === "fullRight"
              ? `order-${props.breakContent}-1`
              : props.imgSide === "bottom" || props.imgSide === "fullBottom"
              ? "order-1"
              : ""
            : props.imgSide === "left" ||
              props.imgSide === "top" ||
              props.imgSide === "fullTop" ||
              props.imgSide === "fullLeft"
            ? "order-2"
            : props.imgSide === "right" || props.imgSide === "fullRight"
            ? "order-1"
            : props.imgSide === "bottom" || props.imgSide === "fullBottom"
            ? "order-1"
            : ""
        }`}
      >
        <div
          ref={blocoTextoRef}
          className={`${
            props.isTabs && props.typeHeaderTabs === "vertical"
              ? "p-tabs-vertical"
              : paddingCarousel
              ? "p-carousel-full-vertical"
              : "p-default"
          }`}
        >
          {/* caso seja um tab vertical ele aplica a classe de paddings*/}
          {/* caso seja um carousel com imagem Full top ou bottom, ele aplica a classe de paddings*/}
          {/* caso seja um card horizontal ele entra aqui */}
          {props.isCard && props.title ? (
            <Fragment>
              <Card.Title as="div">
                <Title
                  typeH={props.typeH}
                  className={props.titleClassName}
                  content={<Fragment>{props.title}</Fragment>}
                />
              </Card.Title>
              <Card.Text as="div">
                <TextBlock textsBlock={props.textsBlock} />
              </Card.Text>
            </Fragment>
          ) : /* caso seja um carrossel ele entra aqui */
          props.isCarousel && props.title ? (
            <Fragment>
              <Title
                typeH={props.typeH}
                className={props.titleClassName}
                content={<Fragment>{props.title}</Fragment>}
              />

              <TextBlock textsBlock={props.textsBlock} />
            </Fragment>
          ) : /* caso seja um feedBack ele entra aqui */
          props.isFeedBack && props.title ? (
            <Fragment>
              <Title
                typeH={props.typeH}
                className={props.titleClassName}
                content={<Fragment>{props.title}</Fragment>}
              />

              <TextBlock textsBlock={props.textsBlock} />
            </Fragment>
          ) : props.isQuizzOneAnswer ? (
            <Fragment>
              {props.questionTexts}
              {props.formGroupOneAnswer}
            </Fragment>
          ) : (
            <TextBlock textsBlock={props.textsBlock} />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default memo(FlexImgWithText);
