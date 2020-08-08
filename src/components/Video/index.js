import React, { useEffect, useRef } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FiVideoOff, FiVideo } from "react-icons/fi";
import { RiFullscreenLine } from "react-icons/ri";

import "./styles.css";

import {
  VideoContainer,
  VideoStyled,
  VideoControlsOverlay,
  ParticipantName,
  AudioToggle,
  VideoToggle,
  FullScreenToggle
} from "./styledComponents";
import useStreamMuteStatus from "../../CustomHooks/useStreamMuteStatus";

const Video = ({
  stream,
  muteVideo = false,
  name = "anonymous",
  screenShare = false
}) => {
  const [config, toggleAudio, toggleVideo] = useStreamMuteStatus(stream);

  const selfRef = useRef();

  useEffect(() => {
    if (stream) selfRef.current.srcObject = stream;
    return () => {
      console.log("stopping media stream");
      stream && stream.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  const selfName = window.sessionStorage.getItem("name");

  const VideoControls = () => {
    return (
      <VideoControlsOverlay>
        <AudioToggle muted={!config.audio} onClick={toggleAudio}>
          {config.audio ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
        </AudioToggle>
        <VideoToggle muted={!config.video} onClick={toggleVideo}>
          {config.video ? <FiVideo /> : <FiVideoOff />}
        </VideoToggle>
      </VideoControlsOverlay>
    );
  };

  const toggleFullscreen = () => {
    if (document.fullscreenEnabled) {
      selfRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <VideoContainer>
      {console.log("all stream config", config)}
      <ParticipantName>{muteVideo ? selfName + "(You)" : name}</ParticipantName>
      <VideoStyled
        flipVideo={!screenShare}
        ref={selfRef}
        autoPlay
        muted={muteVideo}
      />
      {!muteVideo && VideoControls()}
      <FullScreenToggle onClick={toggleFullscreen}>
        <RiFullscreenLine />
      </FullScreenToggle>
    </VideoContainer>
  );
};

export default Video;
