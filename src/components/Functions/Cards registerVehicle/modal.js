import React, {useContext, useState} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button, TextField} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";

export const UseCardRegisterVehicle = () =>{

    const {toggleCardRegisterVehicle} = useContext(DataContext);

    const {contract} = useContext(DataContext);
    const {account} = useContext(DataContext);

    const [data1 ,setData1] = useState("");
    const [data2 ,setData2] = useState("");
    const [data3 ,setData3] = useState("");

    const regDriverProfile = (props) =>{
        contract.methods.registerVehicle(data1,data2,data3).send({ from: account });
        toggleCardRegisterVehicle();
    }

    return(
        <Container>
            <StyledSignUp  onClick={toggleCardRegisterVehicle}/>
            <Modal>
                    <TextField label={"Категория"} onChange={(e) => setData1(e.target.value)}/>
                    <TextField label={"Время использования"} onChange={(e) => setData2(e.target.value)}/>
                    <TextField label={"Рыночная стоимость"} onChange={(e) => setData3(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={regDriverProfile}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>
    )
}