import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetDriversLicensesForDPS = () => {

    const {toggleGetDriversLicensesForDPS} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Просмотр всех зарегистрированных водительских удостоверений</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetDriversLicensesForDPS}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
