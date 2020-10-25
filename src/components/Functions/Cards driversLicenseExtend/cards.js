import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { StyledCard,StyledCardActions, StyledCardContent } from "./styledCard";
import {DataContext} from "../../contexts/DataContext";


export const CardDriversLicenseExtend = () => {

    const {contract} = useContext(DataContext);
    const {account} = useContext(DataContext);

    const regUserFunc = () =>{
        contract.methods.driversLicenseExtend().send({ from: account });
    }

    return (
    <>
        <StyledCard>
          <StyledCardContent>
            <div>
              <b>Продление срока действия водительского удостоверения</b>
            </div>
            <div>

            </div>
          </StyledCardContent>
          <StyledCardActions>
            <Button onClick={regUserFunc}>
              Использовать
            </Button>
          </StyledCardActions>
        </StyledCard>

    </>
  );
};
