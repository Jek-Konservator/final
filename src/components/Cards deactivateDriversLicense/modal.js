import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../contexts/DataContext";

export const UseDeactivateDriversLicense = () =>{

    const {toggleCardDeactivateDriversLicense} = useContext(DataContext);

    const {contract} = useContext(DataContext);
    const {account} = useContext(DataContext);

    const [data,setData] = useState("");

    const regDriverProfile = (props) =>{
        contract.methods.deactivateDriversLicense(data).send({ from: account });
        toggleCardDeactivateDriversLicense();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardDeactivateDriversLicense}/>
            <Modal>
                    <TextField label={"ID профиля пользователя"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regDriverProfile}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>
    )
}