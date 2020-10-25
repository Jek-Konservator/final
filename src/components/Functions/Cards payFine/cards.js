import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardPayFine = () => {

    const {toggleCardPayFine} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Оплатить штраф</b>
            </div>
            <div>
                ID штрафа
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardPayFine}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
