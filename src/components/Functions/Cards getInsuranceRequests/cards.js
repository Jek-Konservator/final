import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardGetInsuranceRequests = () => {

    const {toggleGetInsuranceRequests} = useContext(DataContext);

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Вывод всех запросов на страховку</b>
            </div>
            <div>
            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={toggleGetInsuranceRequests}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
