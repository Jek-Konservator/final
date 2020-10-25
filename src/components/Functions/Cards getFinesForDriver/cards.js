import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetFinesForDriver = () => {

    const {toggleGetFinesForDriver} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Просмотра штрафов</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetFinesForDriver}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
