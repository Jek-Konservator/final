import React from "react";
import { CardActions, CardContent, Button } from "@material-ui/core";
import { StyledCard } from "./styled";


export const CurrentCard = ({toggleModal}) => {
  return (
    <StyledCard>
      <CardContent>
        <>
            <div><b>Название услуги</b></div>
          <div>Описание</div>
        </>
      </CardContent>
      <CardActions>
        <Button onClick={toggleModal}>
          Delete Card
        </Button>
      </CardActions>
    </StyledCard>
  );
};
