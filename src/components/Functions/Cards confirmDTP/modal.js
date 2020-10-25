import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseConfirmDTP = () => {

    const {toggleCardConfirmDTP} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.confirmDTP(data).send({ from: account });
        toggleCardConfirmDTP();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardConfirmDTP}/>
            <Modal>
                <TextField label={"ID ДТП"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}