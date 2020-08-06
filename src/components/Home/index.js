import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import {
  HomeContainer,
  Heading,
  Form,
  CreatRoom,
  RoomId,
  Or,
  InnerContainer,
  Name,
  TransparentButton,
  ActionContainer
} from "./styledComponents";

const Home = () => {
  const { meetingId } = useParams();
  console.log("meetingId param", meetingId);
  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    error: false,
    newRoom: !Boolean(meetingId)
  });

  const toggleNewRoom = () => {
    setState({ ...state, newRoom: !state.newRoom });
  };

  const onCreateNewRoom = () => {
    setState({ ...state, loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/createRoom`)
      .then((res) => res.json())
      .then(
        (result) => {
          setState({ ...state, loading: false });
          console.log(result.roomId);
          goToMeetingPage(result.roomId);
        },
        (error) => {
          setState({ ...state, loading: false, error });
        }
      );
  };

  const newRoomActions = () => {
    return (
      <>
        <CreatRoom type="submit" name="action" disabled={state.loading}>
          {state.loading ? (
            <CircularProgress color={"white"} size={21} />
          ) : (
            "Create Room"
          )}
        </CreatRoom>
        <Or>or</Or>
        <TransparentButton name="action" onClick={toggleNewRoom}>
          Enter Room Id
        </TransparentButton>
      </>
    );
  };

  const joinByRoomIdActions = () => {
    return (
      <>
        <CreatRoom
          type="submit"
          name="action"
          value="existing"
          disabled={state.loading}
        >
          {state.loading ? (
            <CircularProgress color={"white"} size={21} />
          ) : (
            "Join Room"
          )}
        </CreatRoom>
        <Or>or</Or>
        <TransparentButton onClick={toggleNewRoom}>
          Create New Room
        </TransparentButton>
      </>
    );
  };

  const onSubmitMeetingId = (e) => {
    e.preventDefault();

    const name = e.target.name.value;

    window.sessionStorage.setItem("name", name);

    if (state.newRoom) {
      return onCreateNewRoom();
    }
    const meetingId = e.target.meetingid.value;

    const isValidMeetingId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      meetingId
    );

    if (isValidMeetingId) {
      goToMeetingPage(meetingId);
    }
  };

  const goToMeetingPage = (meetingId) => {
    history.push(`/meeting/${meetingId}`);
  };

  return (
    <HomeContainer>
      <InnerContainer>
        <Heading>Its time to talk with your Friends.</Heading>
        <Form onSubmit={onSubmitMeetingId}>
          <Name
            defaultValue={window.sessionStorage.getItem("name")}
            type="text"
            required
            name="name"
            placeholder="Enter your name"
          />
          {!state.newRoom && (
            <RoomId
              required
              defaultValue={meetingId}
              type="text"
              name="meetingid"
              placeholder="Enter Room Id"
            />
          )}
          <ActionContainer>
            {state.newRoom ? newRoomActions() : joinByRoomIdActions()}
          </ActionContainer>
        </Form>
      </InnerContainer>
    </HomeContainer>
  );
};

export default Home;
