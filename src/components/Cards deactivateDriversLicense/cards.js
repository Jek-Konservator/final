import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../contexts/DataContext";


export const CardDeactivateDriversLicense = () => {

    const {toggleCardDeactivateDriversLicense} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Деактивация водительского удостоверения</b>
            </div>
            <div>
                Введите ID пользователя
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardDeactivateDriversLicense}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
