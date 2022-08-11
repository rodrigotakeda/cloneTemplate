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

//Functions
import debounceTimeOut from "../../../../globalFunctions/debounceTimeOut";

function ChangeByVideo(props) {
  // hideOnClick esconde o menu quando o usuario clica
  // centerOnHide centraliza o video quando o menu é escondido
  // menuSide pode ser left ou right
  let initSelected = [];
  const [load, setLoad] = useState(false);
  const [dataHd, setDataHd] = useState([]);
  const [dataSd, setDataSd] = useState([]);
  const [dataLeg, setDataLeg] = useState([]);

  const [videoElements, setVideoElements] = useState({});
  const [selected, setSelected] = useState(initSelected);
  const [listVideos, setListVideos] = useState(false);

  const [show, setShow] = useState(true);
  const [overFlowBack, setOverFlowBack] = useState(false);
  const menuItemRef = useRef(null);
  const listRef = useRef(null);
  const playerRef = useRef(null);

  async function loadData() {
    const data = await VideosMenu.getVideoByVideo(
      props.videoElements.videosFile
    );

    const videoData = data.videos;
    return videoData;
  }

  function loadVideosPaths(videos) {
    const videosPaths = videos.map((video) => {
      return {
        videoHd: import(`../../../../screens/assets/videos/${video.video}.mp4`),
        videoSd: import(
          `../../../../screens/assets/videos/${video.video}_360p.mp4`
        ),
        legenda: import(`../../../../screens/assets/videos/${video.video}.vtt`),
      };
    });
    return videosPaths;
  }

  useEffect(async () => {
    const videos = await loadData();
    const resultPath = loadVideosPaths(videos);
    const cloneDataHd = [];
    const cloneDataSd = [];
    const cloneDataLeg = [];
    const cloneVideoElements = { ...videoElements };
    let dataPath;
    let pathRes;

    resultPath.forEach(async (path, id) => {
      pathRes = await path.videoHd;
      cloneDataHd.push(pathRes.default);

      pathRes = await path.videoSd;
      cloneDataSd.push(pathRes.default);

      pathRes = await path.legenda;
      cloneDataLeg.push(pathRes.default);
    });

    setDataHd(cloneDataHd);
    setDataSd(cloneDataSd);
    setDataLeg(cloneDataLeg);

    dataPath = await resultPath[0].videoHd;
    cloneVideoElements.videoHd = dataPath.default;

    dataPath = await resultPath[0].videoSd;
    cloneVideoElements.videoSd = dataPath.default;

    dataPath = await resultPath[0].legenda;
    cloneVideoElements.legenda = dataPath.default;
    setVideoElements(cloneVideoElements);

    setListVideos(
      videos.map((video, id) => {
        return {
          className: `listItemVideo ${selected[id] ? "selected" : ""}`,
          content: <Fragment>{video.name}</Fragment>,
          attribute: video.video,
          id: id,
        };
      })
    );

    initSelected = videos.map(() => {
      return false;
    });

    setLoad(true);
  }, [load, selected]);

  // ajusta o align-items do flex caso tenha scroll para start
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
  };

  function handleVideo(e) {
    const video = e.currentTarget.getAttribute("attribute");
    let idItem;
    let newSelected = [...selected];

    listVideos.forEach((listItem, id) => {
      if (listItem.attribute == video) {
        idItem = listItem.id;
        newSelected[id] = true;
      } else {
        newSelected[id] = false;
      }
    });

    setSelected(newSelected);

    playerRef.current.src([
      {
        src: dataHd[idItem],
        type: "video/mp4",
        label: "HD",
        selected: true,
      },
      {
        src: dataSd[idItem],
        type: "video/mp4",
        label: "SD",
      },
    ]);

    let oldTrack = playerRef.current.remoteTextTracks();
    playerRef.current.removeRemoteTextTrack(oldTrack[0]);
    playerRef.current.addRemoteTextTrack(
      {
        src: dataLeg[idItem],
        kind: "captions",
        srclang: "pt-br",
        label: "Português-Br",
      },
      true
    );

    playerRef.current.play();
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
          className={`playerChangeByVideo ${
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
                  listItens={listVideos}
                  onClick={(e) => handleVideo(e)}
                  className="listItemsVideo"
                />
              </div>
            </div>
          </div>
          <div className="ps-0 pe-0 video">
            <VideoJS
              className="mb-0 "
              videoElements={videoElements}
              onReady={handlePlayerReady}
            />
          </div>
        </Row>
      </Fragment>
    );
  }
}

export default ChangeByVideo;
