import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../contexts/DataContext";


export const CardVerifyDriversLicense = () => {

    const {toggleSingUp} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Подтверждения водительского удостоверения</b>
            </div>
            <div>
                ID пользователя
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleSingUp}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
