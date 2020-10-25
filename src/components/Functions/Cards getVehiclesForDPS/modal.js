import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetVehiclesForDPS = () => {

    const {toggleGetVehiclesForDPS,dataGetVehiclesForDPS} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetVehiclesForDPS}/>
            <Modal>
                <div>ID машины:{dataGetVehiclesForDPS[0]}</div>
                <div>ID владельца:{dataGetVehiclesForDPS[1]}</div>
                <div>Категория:{dataGetVehiclesForDPS[2]}</div>
                <div>Период использования:{dataGetVehiclesForDPS[3]}</div>
                <div>Рыночная стоимость:{dataGetVehiclesForDPS[4]}</div>
                <div>Статус подтверждения:{dataGetVehiclesForDPS[5]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetVehiclesForDPS}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}