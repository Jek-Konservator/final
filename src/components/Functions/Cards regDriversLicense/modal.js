import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UesCardRegDriversLicense = () =>{

    const {toggleCardRegDriversLicense} = useContext(DataContext);

    const {contract} = useContext(DataContext);

    const {account} = useContext(DataContext);

    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");

    const regUserFunc = () =>{
        contract.methods.regDriversLicense(data1,data2,data3).send({ from: account });
        toggleCardRegDriversLicense();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardRegDriversLicense}/>
            <Modal>
                <TextField label={"ID водителя"} onChange={(e) => setData1(e.target.value)}/>
                <TextField label={"Срок действия"} onChange={(e) => setData2(e.target.value)}/>
                <TextField label={"Категория"} onChange={(e) => setData3(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regUserFunc}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}