import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardRegisterVehicle = () => {

    const {toggleCardRegisterVehicle} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Регистрации транспортного средства</b>
            </div>
            <div>
                Введите категорию, время использования, рыночную стоимость
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardRegisterVehicle}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
