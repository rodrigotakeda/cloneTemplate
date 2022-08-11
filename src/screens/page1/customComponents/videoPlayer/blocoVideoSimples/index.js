// React Elements/Hooks
import { useState, Fragment } from "react";
import React from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../../../components/texts/title";
import VideoJS from "../../../../../components/video/videoJs";

//Video Elementos
import videoHd from "../../../../assets/videos/opcao1.mp4";
import videoSd from "../../../../assets/videos/vinheta_teste.mp4";
import poster from "../../../../assets/videos/capaVideo.png";
import legenda from "../../../../assets/videos/vinheta_teste.vtt";

function BlocoVideoSimples(props) {
  const videoElements = { videoHd, videoSd, poster, legenda };

  return (
    <Fragment>
      <Col xs="12">
        <Title typeH="4" className="" content={<Fragment>Padrão</Fragment>} />
      </Col>
      <Col lg="9">
        <VideoJS className="mb-5" videoElements={videoElements} />
      </Col>
    </Fragment>
  );
}

export default BlocoVideoSimples;
