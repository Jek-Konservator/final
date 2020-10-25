import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetVehiclesForDPS = () => {

    const {toggleGetVehiclesForDPS} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Просмотра зарегистрированных транспортных средств</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetVehiclesForDPS}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
