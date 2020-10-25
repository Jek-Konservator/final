import styled from "styled-components";
import { CardActions, CardContent } from "@material-ui/core";

export const StyledCard = styled.div`
  width: 250px;
  height: 250px;
  margin: 10px;
  background-color: #6b6b6b;
  border: 3px solid #63dafd;
  border-radius: 6%;
  box-sizing: content-box;
  color: #ffffffff;
  
  Button{
  width: 135px;
  height: 40px;
  background-color: #63dafd;
  border: 4px solid #63dafd;

  }
    
    div{
    margin-bottom: 5%;
    }
`;

export const StyledCardActions = styled(CardActions)`
display: flex;
align-content: flex-end;
`

export const StyledCardContent = styled(CardContent)`
height: 50%;
`
