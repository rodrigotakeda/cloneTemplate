// Css
import "./index.scss";

import React, { useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";
require("@silvermine/videojs-quality-selector/")(videojs);

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { onReady } = props;

  let controlBarItems;
  if (!props.videoElements.controlBar) {
    controlBarItems = "";
  } else {
    controlBarItems = [...props.videoElements.controlBar.children];
    console.log(controlBarItems);
  }

  const options = {
    autoplay:
      props.videoElements.autoplay == undefined
        ? false
        : props.videoElements.autoplay
        ? props.videoElements.autoplay
        : false,
    muted:
      props.videoElements.autoplay == undefined
        ? false
        : props.videoElements.autoplay
        ? props.videoElements.autoplay
        : false,
    controls:
      props.videoElements.controls == undefined
        ? true
        : props.videoElements.controls == false
        ? props.videoElements.controls
        : true,

    responsive:
      props.videoElements.responsive == undefined
        ? true
        : props.videoElements.responsive == false
        ? props.videoElements.responsive
        : true,

    poster: props.videoElements.poster,
    fluid:
      props.videoElements.fluid == undefined
        ? true
        : props.videoElements.fluid == false
        ? props.videoElements.fluid
        : true,

    controlBar: {
      children: [
        "playToggle",
        "progressControl",
        "volumePanel",
        "qualitySelector",
        "subsCapsButton",
        "fullscreenToggle",
        ...controlBarItems,
      ],
    },
    sources: [
      {
        src: props.videoElements.videoHd,
        type: "video/mp4",
        label: "HD",
        selected: true,
      },
      {
        src: props.videoElements.videoSd,
        type: "video/mp4",
        label: "SD",
      },
    ],
    tracks: [
      {
        src: props.videoElements.legenda,
        kind: "captions",
        srclang: "pt-br",
        label: "Português-Br",
      },
    ],
  };

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className={`player ${props.className ? props.className : ""}`}>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default VideoJS;
