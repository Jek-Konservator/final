import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetDTPsForDriver = () => {

    const {toggleGetDTPsForDriver} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Просмотра ДТП (для водителя)</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetDTPsForDriver}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
