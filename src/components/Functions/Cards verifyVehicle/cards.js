import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardVerifyVehicle = () => {

    const {toggleCardVerifyVehicle} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Подтверждения регистрации транспортных средств</b>
            </div>
            <div>
                Введите ID владельца
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardVerifyVehicle}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
