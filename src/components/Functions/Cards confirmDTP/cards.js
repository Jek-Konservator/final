import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardConfirmDTP = () => {

    const {toggleCardConfirmDTP} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Подтверждение факта ДТП водителем</b>
            </div>
            <div>
                Введите ID ДТП
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardConfirmDTP}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
