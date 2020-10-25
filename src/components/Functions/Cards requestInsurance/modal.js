import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseRequestInsurance = () => {

    const {toggleCardRequestInsurance} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");

    const regUserFunc = () =>{
        contract.methods.requestInsurance(data1, data2).send({ from: account });
        toggleCardRequestInsurance();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardRequestInsurance}/>
            <Modal>
                <TextField label={"ФИО"} onChange={(e) => setData1(e.target.value)}/>
                <TextField label={"ID транспортного средства"} onChange={(e) => setData2(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}