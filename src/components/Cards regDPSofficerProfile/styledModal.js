import styled from "styled-components";

export const StyledSignUp = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
  opacity: 0.4;
  left: 0;
  top: 0;
  z-index: 1;
  position: absolute;  
`

export const Modal = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  z-index: 2;
  position: absolute;
  background-color: #ffffff;
  margin-top: 5%;
`
export const Container = styled.div`
display: flex;
justify-content: center;
`

export const ButtonContainer = styled.div`

display: flex;
justify-content: center;
margin-top: auto;
margin-bottom: 1%;

Button{
background-color: #6b6b6b;
color: #63dafd;
border: 4px solid #6b6b6b;
margin-bottom: 3%;
}
`