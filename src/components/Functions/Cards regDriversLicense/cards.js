import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard, StyledCardActions,StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardRegDriversLicense = () => {

    const {toggleCardregDPSofficerProfile} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Регистрация водительского удостоверения</b>
            </div>
            <div>
                Введите данные о водительском удостоверении
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleCardregDPSofficerProfile}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
