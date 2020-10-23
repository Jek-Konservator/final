import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../contexts/DataContext";

export const UseRegDriverProfile = () =>{

    const {toggleCardregDPSofficerProfile} = useContext(DataContext);

    const {contract} = useContext(DataContext);
    const {account} = useContext(DataContext);

    const [data,setData] = useState("");

    const regDriverProfile = (props) =>{
        contract.methods.regDPSofficerProfile(data).send({ from: account });
        toggleCardregDPSofficerProfile();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardregDPSofficerProfile}/>
            <Modal>
                    <TextField label={"ID профиля пользователя"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regDriverProfile}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>
    )
}