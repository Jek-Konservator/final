import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseRegisterDTP = () => {

    const {toggleCardRegisterDTP} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");

    const regUserFunc = () =>{
        contract.methods.registerDTP(data1, data2).send({ from: account });
        toggleCardRegisterDTP();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardRegisterDTP}/>
            <Modal>
                <TextField label={"ID пострадавшего"} onChange={(e) => setData1(e.target.value)}/>
                <TextField label={"дата ДТП"} onChange={(e) => setData2(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}