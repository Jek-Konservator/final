import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseVerifyInsuranceRequest = () => {

    const {toggleCardVerifyInsuranceRequest} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data, setData] = useState("");

    const regUserFunc = () =>{
        contract.methods.verifyInsuranceRequest(data).send({ from: account });
        toggleCardVerifyInsuranceRequest();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardVerifyInsuranceRequest}/>
            <Modal>
                <TextField label={"ID запроса"} onChange={(e) => setData(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}