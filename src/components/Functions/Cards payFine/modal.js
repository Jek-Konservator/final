import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UsePayFine = () => {

    const {toggleCardPayFine} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.payFine(data).send({ from: account });
        toggleCardPayFine();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardPayFine}/>
            <Modal>
                <TextField label={"ID штрафа"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}