import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetDriversLicensesForDPS = () => {

    const {toggleGetDriversLicensesForDPS,dataGetGetDriversLicensesForDPS} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetDriversLicensesForDPS}/>
            <Modal>
                <div>ID владельца:{dataGetGetDriversLicensesForDPS[0]}</div>
                <div>Номер:{dataGetGetDriversLicensesForDPS[1]}</div>
                <div>Срок действия:{dataGetGetDriversLicensesForDPS[2]}</div>
                <div>Категория:{dataGetGetDriversLicensesForDPS[3]}</div>
                <div>Адрес владельца в системе:{dataGetGetDriversLicensesForDPS[4]}</div>
                <div>Статус подтверждения:{dataGetGetDriversLicensesForDPS[5]}</div>
                <div>Активность:{dataGetGetDriversLicensesForDPS[6]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetDriversLicensesForDPS}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}