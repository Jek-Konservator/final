import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardRegisterDTP = () => {

    const {toggleCardRegisterDTP} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Регистрация ДТП</b>
            </div>
            <div>
                Введите ID пострадавшего, дату ДТП
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardRegisterDTP}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
