import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetDriversForDPS = () => {

    const {toggleGetDriversForDPS} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Просмотр водителей</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetDriversForDPS}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
