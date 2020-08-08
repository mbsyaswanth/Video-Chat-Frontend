import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;
  align-self: center;
`;

export const VideoStyled = styled.video`
  width: 100%;
  object-fit: contain;
  transform: ${(props) => (props.flipVideo ? "scaleX(-1)" : "")};
  background: rgba(0, 0, 0, 0.5);
  max-height: calc(100vh - 60px);
`;

export const VideoControlsOverlay = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ParticipantName = styled.h4`
  font-size: 0.9rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  padding: 5px;
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
`;

export const AudioToggle = styled.button`
  display: flex;
  margin: 0 5px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => (props.muted ? "#DA2222" : "rgba(0, 0, 0, 0.5)")};
  transition: all 0.25s linear;
  :focus {
    outline: none;
  }
`;

export const VideoToggle = styled.button`
  display: flex;
  margin: 0 5px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => (props.muted ? "#DA2222" : "rgba(0, 0, 0, 0.5)")};
  transition: all 0.25s linear;
  :focus {
    outline: none;
  }
`;

export const FullScreenToggle = styled.button`
  z-index: 2147483647;
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  margin: 0 5px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => (props.muted ? "#DA2222" : "rgba(0, 0, 0, 0.5)")};
  transition: all 0.25s linear;
  :focus {
    outline: none;
  }
`;
