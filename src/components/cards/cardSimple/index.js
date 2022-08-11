// Css
import "./index.scss";

// React Elements/Hooks
import { Fragment } from "react";

// Components
import { Card } from "react-bootstrap";
import TextBlock from "../../texts/text_block";
import Title from "../../texts/title";
import FlexImgWithText from "../../images/flexImgWithText";
//Imagens

function CardSimple(props) {
  //imgSide pode ser "top" , "bottom", "fullLeft" ou "fullRight"
  let ImgCard;
  ImgCard = setImgCard();

  function setImgCard(imgStyle) {
    if (props.cardItems.hoverAnimated) {
      return (ImgCard = (
        <div className="img-content">
          <Card.Img
            style={imgStyle}
            variant={props.cardItems.images.imgSide}
            src={props.cardItems.images.imgCard}
          />
          <div className="box-content">
            <Title
              typeH={props.cardItems.hoverAnimated.tagTitleHover}
              className=""
              content={
                <Fragment>{props.cardItems.hoverAnimated.textHover}</Fragment>
              }
            />
            <div className="icon"></div>
          </div>
        </div>
      ));
    } else if (
      props.cardItems.images.imgSide === "fullLeft" ||
      props.cardItems.images.imgSide === "fullRight"
    ) {
      return (ImgCard = (
        <Card.Img
          style={imgStyle}
          variant={props.cardItems.images.imgSide}
          src={props.cardItems.images.imgCard}
        />
      ));
    } else {
      return (ImgCard = (
        <Card.Img
          variant={props.cardItems.images.imgSide}
          src={props.cardItems.images.imgCard}
        />
      ));
    }
  }

  return (
    <Fragment>
      <Card
        className={`${props.className} ${
          props.cardItems.hoverAnimated
            ? props.cardItems.hoverAnimated.classHover
            : ""
        }`}
      >
        {props.cardItems.images.imgSide === "fullLeft" ||
        props.cardItems.images.imgSide === "fullRight" ? (
          <Card.Body
            className={`${props.cardItems.contents.contentClassName} ${props.cardItems.images.imgSide}`}
          >
            <FlexImgWithText
              isCard={true}
              breakContent={props.breakContent}
              setImgCard={setImgCard}
              title={props.cardItems.title.titleContent}
              typeH={props.cardItems.title.tagTitle}
              titleClassName={props.cardItems.title.titleClassName}
              textsBlock={props.cardItems.contents.textBlocks}
              imgSide={props.cardItems.images.imgSide}
              imgUrl={props.cardItems.images.imgCard}
              rowClasses={props.cardItems.images.rowClasses}
              colXs={props.cardItems.images.colXs}
              colSm={props.cardItems.images.colSm}
              colMd={props.cardItems.images.colMd}
              colLg={props.cardItems.images.colLg}
              colXl={props.cardItems.images.colXl}
              colXXl={props.cardItems.images.colXXl}
            />
          </Card.Body>
        ) : (
          ""
        )}
        {props.cardItems.images.imgSide === "top" && (
          <Fragment>
            {ImgCard}
            <Card.Body className={props.cardItems.contents.contentClassName}>
              <Card.Title as="div">
                <Title
                  typeH={props.cardItems.title.tagTitle}
                  className={props.cardItems.title.titleClassName}
                  content={
                    <Fragment>{props.cardItems.title.titleContent}</Fragment>
                  }
                />
              </Card.Title>
              <Card.Text as="div">
                <TextBlock textsBlock={props.cardItems.contents.textBlocks} />
              </Card.Text>
            </Card.Body>
          </Fragment>
        )}
        {props.cardItems.images.imgSide === "bottom" && (
          <Fragment>
            <Card.Body className={props.cardItems.contents.contentClassName}>
              <Card.Title as="div">
                <Title
                  typeH={props.cardItems.title.tagTitle}
                  className={props.cardItems.title.titleClassName}
                  content={
                    <Fragment>{props.cardItems.title.titleContent}</Fragment>
                  }
                />
              </Card.Title>
              <Card.Text as="div">
                <TextBlock textsBlock={props.cardItems.contents.textBlocks} />
              </Card.Text>
            </Card.Body>
            {ImgCard}
          </Fragment>
        )}
      </Card>
    </Fragment>
  );
}

export default CardSimple;
