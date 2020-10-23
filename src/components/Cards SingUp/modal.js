import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../contexts/DataContext";


export const UseSingUp = () => {

    const {toggleSingUp} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.regDriver(data).send({ from: account });
        toggleSingUp();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleSingUp}/>
            <Modal>
                <TextField label={"ФИО"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}