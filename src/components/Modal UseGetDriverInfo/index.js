import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ModalContainer} from "./style";
import {Button} from '@material-ui/core/';
import {DataContext} from "../contexts/DataContext";

export const UseGetDriverInfo = () =>{

    const {toggleGetDriverInfo} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const [ , DriverID] = useState(null);
    const [ , FIO] = useState(null);
    const [ , driverAddress] = useState(null);
    const [ , licenseNumber] = useState(null);
    /* const [ , expStartYear] = useState(null);
     const [ , DTPcount] = useState(null);
     const [ , unpayedFines] = useState(null);
     const [ , balance] = useState(null);
     const [ , insuranceStatus] = useState(null);*/

    const regDriverProfile = (props) =>{
        const data = contract.methods.getDriverInfo().call();
        DriverID(data[0])
        FIO(data[1])
        driverAddress(data[2])
        licenseNumber(data[3])
        /*expStartYear(data[4])
        DTPcount(data[5])
        unpayedFines(data[6])
        balance(data[7])
        insuranceStatus(data[8])*/
        console.log(data);
        //toggleGetDriverInfo();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetDriverInfo}/>
                <Modal>
                    <ModalContainer>
                        <Button onClick={regDriverProfile}>Отправить</Button>
                    </ModalContainer>
                </Modal>
        </Container>

    )
}