import styled from "styled-components";

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.numVideos},1fr);`};
  height: 100vh;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: auto;
  }
`;

export const VideoStyled = styled.video`
  /* height: 100%; */
`;
