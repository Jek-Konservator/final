import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardRegisterFine = () => {

    const {toggleCardRegisterFine} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Выписать штраф</b>
            </div>
            <div>
                ID водителя
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardRegisterFine}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
