import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseCardVerifyVehicle = () => {

    const {toggleCardVerifyVehicle} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.verifyVehicle(data).send({ from: account });
        toggleCardVerifyVehicle();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardVerifyVehicle}/>
            <Modal>
                <TextField label={"ID владельца"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}