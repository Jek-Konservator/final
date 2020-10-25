import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetVehiclesForDriver = () => {

    const {toggleGetVehiclesForDriver,dataGetVehiclesForDriver} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetVehiclesForDriver}/>
            <Modal>
                <div>ID машины:{dataGetVehiclesForDriver[0]}</div>
                <div>ID владельца:{dataGetVehiclesForDriver[1]}</div>
                <div>Категория:{dataGetVehiclesForDriver[2]}</div>
                <div>Период использования:{dataGetVehiclesForDriver[3]}</div>
                <div>Рыночная стоимость:{dataGetVehiclesForDriver[4]}</div>
                <div>Статус подтверждения:{dataGetVehiclesForDriver[5]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetVehiclesForDriver}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}