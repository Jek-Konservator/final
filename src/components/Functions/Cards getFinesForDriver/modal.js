import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetFinesForDriver = () => {

    const {toggleGetFinesForDriver,dataGetFinesForDriver} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetFinesForDriver}/>
            <Modal>
                <div>ID штрафа:{dataGetFinesForDriver[0]}</div>
                <div>ID водителя:{dataGetFinesForDriver[1]}</div>
                <div>Дата назначения штрафа в сек:{dataGetFinesForDriver[2]}</div>
                <div>Статус оплаты:{dataGetFinesForDriver[3]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetFinesForDriver}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}