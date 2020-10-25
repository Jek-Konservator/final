import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseVerifyDriversLicense = () => {

    const {toggleCardVerifyDriversLicense} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.verifyDriversLicense(data).send({ from: account });
        toggleCardVerifyDriversLicense();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardVerifyDriversLicense}/>
            <Modal>
                <TextField label={"ID пользователя"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}