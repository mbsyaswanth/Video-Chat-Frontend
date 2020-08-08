import { useState, useEffect } from "react";

const useStreamMuteStatus = (stream = null) => {
  const audioTrack = stream?.getAudioTracks()[0];
  const videoTrack = stream?.getVideoTracks()[0];
  const [streamConfig, setStreamConfig] = useState({
    audio: Boolean(audioTrack?.enabled),
    video: Boolean(videoTrack?.enabled)
  });

  const initializeState = () => {
    setStreamConfig({
      audio: Boolean(audioTrack?.enabled),
      video: Boolean(videoTrack?.enabled)
    });
  };

  const listenOnTracks = () => {
    initializeState();
    if (audioTrack) {
      audioTrack.onmute = (event) => {
        console.log("audio unmute event", event);
        setStreamConfig({ ...streamConfig, audio: false });
      };

      audioTrack.onunmute = (event) => {
        console.log("audio mute event", event);
        setStreamConfig({ ...streamConfig, audio: true });
      };
    }

    if (videoTrack) {
      videoTrack.onmute = (event) => {
        setStreamConfig({ ...streamConfig, video: false });
      };

      videoTrack.onunmute = (event) => {
        setStreamConfig({ ...streamConfig, video: true });
      };
    }
  };

  useEffect(() => {
    stream && listenOnTracks();
  }, [stream]);

  const toggleAudio = () => {
    audioTrack.enabled = !audioTrack.enabled;
    setStreamConfig({ ...streamConfig, audio: !streamConfig.audio });
    console.log(stream.getAudioTracks()[0]);
  };

  const toggleVideo = () => {
    videoTrack.enabled = !stream.getVideoTracks()[0].enabled;
    setStreamConfig({ ...streamConfig, video: !streamConfig.video });
  };

  return [streamConfig, toggleAudio, toggleVideo, setStreamConfig];
};

export default useStreamMuteStatus;
