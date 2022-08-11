// Css
import "./index.scss";

// React Elements/Hooks
import React, { useState, Fragment, useEffect, useRef } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import List from "../../../texts/lists";
import VideoJS from "../../videoJs";
import Btn from "../../../buttons";

//Services
import VideosMenu from "../../../../services/videosMenu";

// Functions
import debounceTimeOut from "../../../../globalFunctions/debounceTimeOut";

function ChangeByTime(props) {
  // hideOnClick esconde o menu quando o usuario clica
  // centerOnHide centraliza o video quando o menu é escondido
  // menuSide pode ser left ou right
  let initSelected = [];
  const [selected, setSelected] = useState(initSelected);
  const [listItemsVideos, setlistItemsVideos] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(true);
  const [overFlowBack, setOverFlowBack] = useState(false);
  const menuItemRef = useRef(null);
  const listRef = useRef(null);
  const playerRef = useRef(null);

  async function loadData() {
    const data = await VideosMenu.getVideoByTime(
      props.videoElements.capitulosFile
    );
    const videoData = data.chapters;
    return videoData;
  }

  useEffect(async () => {
    const videosChapters = await loadData();

    setlistItemsVideos(
      videosChapters.map((video, id) => {
        return {
          className: `listItemVideo ${selected[id] ? "selected" : ""}`,
          content: <Fragment>{video.name}</Fragment>,
          attribute: video.time,
        };
      })
    );

    initSelected = videosChapters.map(() => {
      return false;
    });

    setLoad(true);
  }, [selected]);

  //ajusta o align-items do flex caso tenha scroll para start
  useEffect(() => {
    if (load) {
      setOverFlowBack(hasScroll());
    }
  }, [load, show]);

  useEffect(() => {
    const debouncedHandleResize = debounceTimeOut(function handleResize() {
      setOverFlowBack(hasScroll());
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);
  ////////////////////////////////////////////////////////////

  function hasScroll() {
    if (listRef.current.clientHeight > menuItemRef.current.clientHeight) {
      return true;
    } else {
      return false;
    }
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("timeupdate", function (evt) {
      let newSelected = [...selected];
      const tempoVideo = Math.floor(this.currentTime());
      listItemsVideos.forEach((chapter, id) => {
        //verifica se esta no ultimo item do video e aplica o selected
        if (
          id == listItemsVideos.length - 1 &&
          tempoVideo >= chapter.attribute
        ) {
          newSelected[id] = true;
          //caso nao esteja no ultimo, vai comparando se esta entre o atual e o proximo e aplica o select
        } else if (
          tempoVideo >= chapter.attribute &&
          tempoVideo < listItemsVideos[id + 1].attribute
        ) {
          newSelected[id] = true;
        }
      });
      setSelected(newSelected);
    });
  };

  function handleChapter(e) {
    const time = e.currentTarget.getAttribute("attribute");
    let newSelected = [...selected];

    listItemsVideos.forEach((chapter, id) => {
      if (time == chapter.attribute) {
        newSelected[id] = true;
      }
    });

    setSelected(newSelected);
    playerRef.current.play();
    playerRef.current.currentTime(time);
    props.videoElements.hideOnClick && setShow(false);
  }

  function handleClose() {
    setShow(!show);
  }

  if (load == false) {
    return <div>Carregando</div>;
  } else {
    return (
      <Fragment>
        <Row
          className={`playerChangeByTime ${
            props.menuSide == "right" ? "right" : "left"
          } ${props.videoElements.centerOnHide ? "centerOnHide" : ""} ${
            show ? "opened" : "closed"
          }`}
        >
          <Btn
            className={`closeButton ${show ? "opened" : "closed"}`}
            onClick={() => handleClose()}
          >
            <span></span>
            <div className="leitorTela">{`${show ? "Abrir" : "Fechar"}`}</div>
          </Btn>

          <div className={`menu ${show ? "opened" : "closed"}`}>
            <div
              className={`menuChapter ${overFlowBack ? "oveflowOn" : ""}`}
              ref={menuItemRef}
            >
              <div ref={listRef}>
                <List
                  tagElement="ol"
                  listItens={listItemsVideos}
                  onClick={(e) => handleChapter(e)}
                  className="listItemsVideo"
                />
              </div>
            </div>
          </div>
          <div className="ps-0 pe-0 video">
            <VideoJS
              className="mb-0 "
              videoElements={props.videoElements}
              onReady={handlePlayerReady}
            />
          </div>
        </Row>
      </Fragment>
    );
  }
}

export default ChangeByTime;
