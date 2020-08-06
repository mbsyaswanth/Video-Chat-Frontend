import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";

import { VideoGrid, VideoStyled } from "./styledComponents";

import Video from "../Video";

const Meeting = () => {
  const { meetingId } = useParams();
  const socket = io.connect(process.env.REACT_APP_SOCKET_URL, {});

  const [streams, addStream] = useState(new Map());
  const [selfStream, setSelfStream] = useState(null);

  const refsArray = useRef([]);

  const selfRef = useRef();

  useEffect(() => {
    async function enableStream() {
      try {
        const myStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setSelfStream(myStream);
        selfRef.current.srcObject = myStream;

        const peer = new Peer(undefined, {
          host: process.env.REACT_APP_PEER_HOST,
          port: process.env.REACT_APP_PEER_PORT,
          path: "/peerjs/peer",
          config: {
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

          socket.on("user-connected", (userId, name) => {
            const call = peer.call(userId, myStream);
            console.log(`calling peer ${name} `, userId);
            call.on("stream", function (userVideoStream) {
              // `stream` is the MediaStream of the remote peer.
              // Here you'd add it to an HTML video/canvas element.
              console.log("received stream", userVideoStream);
              streams.set(userId, { userVideoStream, name });
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
              console.log("Received call from ", call.peer);
              streams.set(call.peer, { userVideoStream, name });
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
    return () => {};
  }, [meetingId]);

  useEffect(() => {
    const assignStreams = () => {
      [...streams.values()].forEach(({ userVideoStream, name }, index) => {
        console.log(userVideoStream);
        refsArray.current[index].srcObject = userVideoStream;
      });
    };
    assignStreams();
  }, [streams]);

  useEffect(() => {
    return () => {
      selfStream && selfStream.getTracks().forEach((track) => track.stop());
    };
  }, [selfStream]);

  const columnCount = () => {
    const streamsCount = streams.size + 1;
    if (streamsCount === 2) {
      return streamsCount;
    }
    return Math.ceil(streamsCount / 2);
  };

  return (
    <div>
      {console.log("self stream value", selfStream)}
      <VideoGrid numVideos={columnCount()}>
        {[...streams.values()].map(({ userVideoStream, name }, index) => {
          console.log("name inside grid ", name);
          return (
            <Video
              key={index}
              stream={userVideoStream}
              name={name}
              ref={(ref) => {
                refsArray.current[index] = ref;
              }}
              autoPlay
            />
          );
        })}
        {selfStream && (
          <Video muteVideo stream={selfStream} ref={selfRef} autoPlay muted />
        )}
      </VideoGrid>
      {/* <button
        onClick={() => {
          selfStream.getAudioTracks()[0].enabled = !selfStream.getAudioTracks()[0]
            .enabled;
        }}
      >
        Mute Audio
      </button>
      <button
        onClick={() => {
          selfStream.getVideoTracks()[0].enabled = !selfStream.getVideoTracks()[0]
            .enabled;
        }}
      >
        Mute Video
      </button> */}
    </div>
  );
};

export default Meeting;
