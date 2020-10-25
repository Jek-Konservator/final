import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardRequestInsurance = () => {

    const {toggleCardRequestInsurance} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Оформление запроса на страховку</b>
            </div>
            <div>
                Введите ФИО, ID транспортного средства
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardRequestInsurance}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
