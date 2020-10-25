import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseInsuranceCasePayback = () => {

    const {toggleCardInsuranceCasePayback} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");

    const regUserFunc = () =>{
        contract.methods.insuranceCasePayback(data1, data2).send({ from: account });
        toggleCardInsuranceCasePayback();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardInsuranceCasePayback}/>
            <Modal>
                <TextField label={"ID ДТП"} onChange={(e) => setData1(e.target.value)}/>
                <TextField label={"ID запроса страхования"} onChange={(e) => setData2(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}