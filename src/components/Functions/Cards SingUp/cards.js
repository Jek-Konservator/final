import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardSingUp = () => {

    const {toggleSingUp} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Зарегестрировать пользователя</b>
            </div>
            <div>
                Введите ФИО
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleSingUp}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
