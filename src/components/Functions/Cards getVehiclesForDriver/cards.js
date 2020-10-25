import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetVehiclesForDriver = () => {

    const {toggleGetVehiclesForDriver} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Посмотр транспортных средств пользователя</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetVehiclesForDriver}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
