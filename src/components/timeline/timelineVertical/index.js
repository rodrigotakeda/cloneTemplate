// Css
import "./index.scss";

// React Elements/Hooks
import { Fragment } from "react";

//Scripts
import AOS from "aos";

// Components
import Title from "../../texts/title";
import TextBlock from "../../texts/text_block";

//Imagens

function TimelineVertical(props) {
  //type pode receber "alternate", "right", "left"
  AOS.init({
    startEvent: "load",
  });

  const timelineVerticalItems = props.timelineVerticalItems.map(
    (timelineVerticalItem, id) => {
      return (
        <div
          key={id}
          className={`item-scroll 
        ${
          props.type === "alternate"
            ? id % 2
              ? props.type
              : ""
            : props.type === "left"
            ? props.type
            : props.type === "right"
            ? props.type
            : ""
        }`}
        >
          <div
            className="image-timeline"
            data-aos={timelineVerticalItem.images.imageAos}
            data-aos-offset={timelineVerticalItem.images.imageAosOffset}
          ></div>
          <div
            className="content-timeline"
            data-aos={timelineVerticalItem.contents.contentAos}
            data-aos-offset={timelineVerticalItem.contents.contentAosOffset}
          >
            <Title
              typeH={timelineVerticalItem.title.tagTitle}
              className={timelineVerticalItem.title.titleClassName}
              content={
                <Fragment>{timelineVerticalItem.title.titleContent}</Fragment>
              }
            />
            <div
              className={`${
                timelineVerticalItem.contents.contentClassName
                  ? timelineVerticalItem.contents.contentClassName
                  : ""
              }`}
            >
              <TextBlock
                textsBlock={timelineVerticalItem.contents.textBlocks}
              />
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <div className={`scrollTimeline ${props.className ? props.className : ""}`}>
      {timelineVerticalItems}
    </div>
  );
}

export default TimelineVertical;
