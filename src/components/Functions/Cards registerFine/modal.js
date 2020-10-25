import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseRegisterFine = () => {

    const {toggleCardRegisterFine} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.registerFine(data).send({ from: account });
        toggleCardRegisterFine();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardRegisterFine}/>
            <Modal>
                <TextField label={"ID водителя"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}