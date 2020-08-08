import styled from "styled-components";

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.numVideos},minmax(0, 1fr));`};
  min-height: calc(100vh - 60px);
  padding-bottom: 60px;
  @media (max-width: 400px) {
    /* grid-template-columns: repeat(2,minmax(0,1fr)); */
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

export const SelfVideoActions = styled.div`
  z-index: 20;
  height: 60px;
  align-items: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  justify-content: center;
  padding: 5px 10px;
  display: flex;
  background: #ffffff;
  box-shadow: 0px -2px 7px 1px #7c7c7c;
  box-sizing: border-box;
`;

export const EndCall = styled.button`
  display: flex;
  margin: 0 16px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: #da2222;
  transition: all 0.1s linear;
  width: 50px;
  height: 44px;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  :focus {
    outline: none;
  }
  :hover {
    box-shadow: 1px 1px 5px 1px #be1e1e;
  }
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

export const ShareScreen = styled.button`
  position: absolute;
  right: 20px;
  display: flex;
  margin: 0 5px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => (props.muted ? "#10b95c" : "rgba(0, 0, 0, 0.5)")};
  transition: all 0.25s linear;
  :focus {
    outline: none;
  }
`;
