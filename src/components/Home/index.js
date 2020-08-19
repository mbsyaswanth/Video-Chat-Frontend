import React, { useReducer } from "react";
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

  const initialState = {
    loading: false,
    error: false,
    newRoom: !Boolean(meetingId)
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, loading: false };
      case "FETCH_ERROR":
        return {
          ...state,
          loading: false,
          error: "something went wrong" + action.error
        };
      case "TOGGLE_NEW_ROOM":
        return { ...state, newRoom: !state.newRoom };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("meetingId param", meetingId);
  const history = useHistory();

  const toggleNewRoom = () => {
    dispatch({ type: "TOGGLE_NEW_ROOM" });
  };

  const onCreateNewRoom = () => {
    dispatch({ type: "LOADING" });
    fetch(`${process.env.REACT_APP_API_URL}/createRoom`)
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch({ type: "FETCH_SUCCESS" });
          console.log(result.roomId);
          goToMeetingPage(result.roomId);
        },
        (error) => {
          dispatch({ type: "FETCH_ERROR", error });
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
        <TransparentButton
          disabled={state.loading}
          name="action"
          onClick={toggleNewRoom}
        >
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
