import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";
import { MdCallEnd, MdScreenShare } from "react-icons/md";

import {
  VideoGrid,
  SelfVideoActions,
  EndCall,
  AudioToggle,
  VideoToggle,
  ShareScreen
} from "./styledComponents";

import Video from "../Video";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FiVideoOff, FiVideo } from "react-icons/fi";
import useStreamMuteStatus from "../../CustomHooks/useStreamMuteStatus";

const Meeting = () => {
  const { meetingId } = useParams();
  const history = useHistory();
  const socket = io.connect(process.env.REACT_APP_SOCKET_URL, {});

  const [streams, addStream] = useState(new Map());
  const [selfStream, setSelfStream] = useState(null);
  const [sharedScreen, setSharedScreen] = useState(null);

  const [config, toggleAudio, toggleVideo] = useStreamMuteStatus(selfStream);

  const refsArray = useRef([]);

  const selfRef = useRef();

  useEffect(() => {
    let peer;
    async function enableStream() {
      try {
        const myStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setSelfStream(myStream);

        peer = new Peer(undefined, {
          host: process.env.REACT_APP_PEER_HOST,
          port: process.env.REACT_APP_PEER_PORT,
          path: "/peerjs/peer",
          config: {
            debug: 3,
            iceServers: [
              { url: "stun:stun.l.google.com:19302" },
              {
                url: "turn:numb.viagenie.ca",
                credential: "123numb123",
                username: "theamazinggamefame@gmail.com"
              },
              {
                url: "stun:numb.viagenie.ca",
                credential: "123numb123",
                username: "theamazinggamefame@gmail.com"
              },
              {
                url: "turn:numb.viagenie.ca:3478",
                credential: "muazkh",
                username: "webrtc@live.com"
              },
              {
                url: "turn:numb.viagenie.ca",
                credential: "muazkh",
                username: "webrtc@live.com"
              },
              {
                url: "turn:numb.viagenie.ca:3478",
                credential: "peerjsdemo",
                username: "p.srikanta@gmail.com"
              },
              {
                url: "turn:192.158.29.39:3478?transport=udp",
                credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
                username: "28224511:1379330808"
              },
              {
                url: "turn:192.158.29.39:3478?transport=tcp",
                credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
                username: "28224511:1379330808"
              }
            ]
          }
        });

        peer.on("open", (id) => {
          console.log("My peer ID is: " + id);

          const name = window.sessionStorage.getItem("name");

          socket.emit("join-room", meetingId, id, name);

          socket.on("user-connected", (userId, username, screen) => {
            const call = peer.call(userId, myStream, {
              metadata: {
                name
              }
            });
            console.log(`calling peer ${username} name from peer: `, userId);
            call.on("stream", function (userVideoStream) {
              // `stream` is the MediaStream of the remote peer.
              // Here you'd add it to an HTML video/canvas element.
              console.log("received stream", userVideoStream);
              streams.set(userId, {
                userVideoStream,
                name: username,
                screen
              });
              addStream(new Map(streams));
            });

            call.on("close", () => {
              call.close();
            });
          });

          socket.on("user-disconnected", (userId) => {
            console.log("user disconnected", userId);
            streams.delete(userId);
            addStream(new Map(streams));
          });

          peer.on("call", (call) => {
            call.answer(myStream);
            call.on("stream", (userVideoStream) => {
              console.log("received stream", userVideoStream);
              console.log("Received call from ", call.peer, call.metadata.name);
              streams.set(call.peer, {
                userVideoStream,
                name: call.metadata.name,
                screen: false
              });
              addStream(new Map(streams));
            });

            call.on("close", () => {
              call.close();
            });
          });

          peer.on("error", function (err) {
            console.log("Peer error:", err);
          });
        });
      } catch (err) {
        console.log("Failed to get stream", err);
      }
    }

    enableStream();
    return () => {
      peer && peer.destroy();
      socket.close();
    };
  }, [meetingId]);

  const startScreenCapture = async (
    displayMediaOptions = { audio: true, video: true }
  ) => {
    let captureStream = null;

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
    } catch (err) {
      console.error("Error: " + err);
    }
    return captureStream;
  };

  const shareScreenWithPeers = async () => {
    const screenCaptureStream = await startScreenCapture();
    if (screenCaptureStream) {
      const peer = new Peer(undefined, {
        host: process.env.REACT_APP_PEER_HOST,
        port: process.env.REACT_APP_PEER_PORT,
        path: "/peerjs/peer",
        config: {
          debug: 3,
          iceServers: [
            { url: "stun:stun.l.google.com:19302" },
            {
              url: "turn:numb.viagenie.ca",
              credential: "123numb123",
              username: "theamazinggamefame@gmail.com"
            },
            {
              url: "stun:numb.viagenie.ca",
              credential: "123numb123",
              username: "theamazinggamefame@gmail.com"
            },
            {
              url: "turn:numb.viagenie.ca:3478",
              credential: "muazkh",
              username: "webrtc@live.com"
            },
            {
              url: "turn:numb.viagenie.ca",
              credential: "muazkh",
              username: "webrtc@live.com"
            },
            {
              url: "turn:numb.viagenie.ca:3478",
              credential: "peerjsdemo",
              username: "p.srikanta@gmail.com"
            },
            {
              url: "turn:192.158.29.39:3478?transport=udp",
              credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
              username: "28224511:1379330808"
            },
            {
              url: "turn:192.158.29.39:3478?transport=tcp",
              credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
              username: "28224511:1379330808"
            }
          ]
        }
      });

      peer.on("open", (id) => {
        const name = window.sessionStorage.getItem("name") + "'s screen";
        setSharedScreen([peer, screenCaptureStream]);
        socket.emit("join-room", meetingId, id, name, true);

        peer.on("call", (call) => {
          call.answer(screenCaptureStream);
          console.log(
            "Received screen capture request from ",
            call.peer,
            call.metadata.name
          );
          call.on("close", () => {
            call.close();
          });
        });

        socket.on("user-disconnected", (userId) => {
          console.log("user disconnected", userId);
          streams.delete(userId);
          addStream(new Map(streams));
        });

        peer.on("error", function (err) {
          console.log("Peer error:", err);
        });
      });
    }
  };

  const toggleScreenShare = () => {
    if (sharedScreen) {
      sharedScreen[1].getTracks().forEach((track) => track.stop());
      streams.delete(sharedScreen[0].id);
      addStream(new Map(streams));
      sharedScreen[0].destroy();
      setSharedScreen(null);
    } else {
      shareScreenWithPeers();
    }
  };

  const columnCount = () => {
    const streamsCount = streams.size + 1;
    if (streamsCount === 2) {
      return streamsCount;
    }
    return Math.ceil(streamsCount / 2);
  };

  const onEndCall = () => {
    history.replace("/");
  };

  return (
    <div>
      {console.log("self stream value", selfStream)}
      <VideoGrid numVideos={columnCount()}>
        {[...streams.values()].map(
          ({ userVideoStream, name, screen }, index) => {
            console.log("name inside grid ", name);
            return (
              <Video
                screenShare={screen}
                key={index}
                stream={userVideoStream}
                name={name}
              />
            );
          }
        )}
        {selfStream && <Video muteVideo stream={selfStream} autoPlay />}
      </VideoGrid>
      <SelfVideoActions>
        {console.log("self stream config", config)}
        <AudioToggle muted={!config.audio} onClick={toggleAudio}>
          {config.audio ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
        </AudioToggle>

        <EndCall onClick={onEndCall}>
          <MdCallEnd />
        </EndCall>
        <VideoToggle muted={!config.video} onClick={toggleVideo}>
          {config.video ? <FiVideo /> : <FiVideoOff />}
        </VideoToggle>
        <ShareScreen muted={Boolean(sharedScreen)} onClick={toggleScreenShare}>
          <MdScreenShare />
        </ShareScreen>
      </SelfVideoActions>
    </div>
  );
};

export default Meeting;
