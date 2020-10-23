import React, {useContext} from 'react';
import {Headerstyle,Container, IconsContainer} from "./style";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SecurityIcon from '@material-ui/icons/Security';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import {DataContext} from "../contexts/DataContext";

export const Header = () => {

    const {contract} = useContext(DataContext);
    const {toggleGetDriverInfo} = useContext(DataContext);
    const {account} = useContext(DataContext);

    const DPSMode = () => {
        contract.methods.DPSmode().send({from: account})
    }

    const DriverMode = () =>{
        contract.methods.driverMode().send({from: account})
    }

    return(
        <Headerstyle>
                <>Безопасносное дорожное движение</>
                <Container>
                    <IconsContainer>
                        <AccountCircleRoundedIcon onClick={toggleGetDriverInfo}/>
                        <SecurityIcon onClick={DPSMode}/>
                        <DriveEtaIcon onClick={DriverMode}/>
                        </IconsContainer>
                </Container>
        </Headerstyle>
        )
}

