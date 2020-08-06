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

const Video = React.forwardRef(
  ({ stream, muteVideo = false, name = "anonymous" }, ref) => {
    const [config, setConfig] = useState({
      audio: stream.getAudioTracks()[0].enabled,
      video: stream.getVideoTracks()[0].enabled
    });

    const toggleAudio = () => {
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
      setConfig({ ...config, audio: !config.audio });
    };

    const toggleVideo = () => {
      stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
      setConfig({ ...config, video: !config.video });
    };

    const selfName = window.sessionStorage.getItem("name");
    console.log("name is ", selfName);

    return (
      <VideoContainer>
        {console.log("muted state", name, muteVideo)}
        <ParticipantName>{muteVideo ? selfName : name}</ParticipantName>
        <VideoStyled ref={ref} autoPlay controls muted={muteVideo} />
        <VideoControlsOverlay>
          <AudioToggle muted={!config.audio} onClick={toggleAudio}>
            <AiOutlineAudio />
          </AudioToggle>
          <VideoToggle muted={!config.video} onClick={toggleVideo}>
            <FiVideoOff />
          </VideoToggle>
        </VideoControlsOverlay>
      </VideoContainer>
    );
  }
);

export default Video;
