import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardInsuranceCasePayback = () => {

    const {toggleCardInsuranceCasePayback} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Выплаты страхового случая</b>
            </div>
            <div>
                Введите ID ДТП, ID запроса страхования
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardInsuranceCasePayback}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
