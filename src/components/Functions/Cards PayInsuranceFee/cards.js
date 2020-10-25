import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardPayInsuranceFee = () => {

    const {toggleCardPayInsuranceFee} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Оплата страхового взноса</b>
            </div>
            <div>
                Введите ID запроса на строхование
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardPayInsuranceFee}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
