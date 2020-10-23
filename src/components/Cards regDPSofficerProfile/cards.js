import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../contexts/DataContext";


export const CardregDPSofficerProfile = () => {

    const {toggleCardregDPSofficerProfile} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Регистрация сотрудника ДПС</b>
            </div>
            <div>
                Введите ID пользователя
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
