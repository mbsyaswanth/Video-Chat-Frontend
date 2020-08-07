import React, { useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { FiVideoOff } from "react-icons/fi";

import {
  VideoContainer,
  VideoStyled,
  VideoControlsOverlay,
  ParticipantName,
  AudioToggle,
  VideoToggle
} from "./styledComponents";
import useStreamMuteStatus from "../../CustomHooks/useStreamMuteStatus";

const Video = React.forwardRef(
  ({ stream, muteVideo = false, name = "anonymous" }, ref) => {
    const [config, toggleAudio, toggleVideo] = useStreamMuteStatus(stream);

    const selfName = window.sessionStorage.getItem("name");

    const VideoControls = () => {
      return (
        <VideoControlsOverlay>
          <AudioToggle muted={!config.audio} onClick={toggleAudio}>
            <AiOutlineAudio />
          </AudioToggle>
          <VideoToggle muted={!config.video} onClick={toggleVideo}>
            <FiVideoOff />
          </VideoToggle>
        </VideoControlsOverlay>
      );
    };

    return (
      <VideoContainer>
        {console.log("all stream config", config)}
        <ParticipantName>
          {muteVideo ? selfName + "(You)" : name}
        </ParticipantName>
        <VideoStyled ref={ref} autoPlay muted={muteVideo} />
        {!muteVideo && VideoControls()}
      </VideoContainer>
    );
  }
);

export default Video;
