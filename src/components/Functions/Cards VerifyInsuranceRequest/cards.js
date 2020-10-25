import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardVerifyInsuranceRequest = () => {

    const {toggleCardVerifyInsuranceRequest} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Подтверждения запроса на страховку</b>
            </div>
            <div>
                Введите ID запроса
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardVerifyInsuranceRequest}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
