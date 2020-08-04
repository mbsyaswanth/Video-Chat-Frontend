import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Heading = styled.h1`
  color: #1a535c;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: 500;
`;

export const BaseButton = styled.button`
  display: inline-block;
  padding: 10px 18px;
  font-size: 17px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  margin: 5px;
  flex-grow: 0;
  transition: all 0.25s linear;
  :focus {
    outline: none;
  }
`;

export const CreatRoom = styled(BaseButton)`
  color: #ffffff;
  background: #ff6b6b;
  :hover:enabled {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  }
  min-width: 137px;
  margin-right: 15px;
  margin-left: 0px;
  :disabled {
    opacity: 0.7;
  }
`;

export const TransparentButton = styled(BaseButton)`
  color: #1a535c;
  font-size: 17px;
  margin-left: 10px;
  background: transparent;
  :hover:enabled {
    background: rgb(239, 239, 239);
  }
`;

export const Or = styled.span`
  color: #1a535c;
  font-size: 20px;
`;

export const Input = styled.input`
  margin-bottom: 20px;
  margin-left: 0px;
  border: 2px solid #ff6b6b;
  font-size: 18px;
  font-weight: bold;
  box-sizing: border-box;
  border-radius: 9px;
  color: #1a535c;
  padding: 10px 5px;
  padding-left: 15px;
  width: 370px;
  ::placeholder {
    color: #8a8a8a;
  }
`;

export const RoomId = styled(Input)``;

export const Name = styled(Input)``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InnerContainer = styled.div``;

export const ActionContainer = styled.div`
  /* margin-top: 5px; */
`;
