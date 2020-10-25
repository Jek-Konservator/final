import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetDriversForDPS = () => {

    const {toggleGetDriversForDPS, dataGetDriversForDPS} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetDriversForDPS}/>
            <Modal>
                <div>ID водителя:{dataGetDriversForDPS[0]}</div>
                <div>ФИО:{dataGetDriversForDPS[1]}</div>
                <div>Адрес в системе:{dataGetDriversForDPS[2]}</div>
                <div>НОмер лицензии:{dataGetDriversForDPS[3]}</div>
                <div>Стаж вождения:{dataGetDriversForDPS[4]}</div>
                <div>Количество ДТП:{dataGetDriversForDPS[5]}</div>
                <div>Неоплаченные штрафы:{dataGetDriversForDPS[6]}</div>
                <div>Баланс:{dataGetDriversForDPS[7]}</div>
                <div>Статус страховки:{dataGetDriversForDPS[8]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetDriversForDPS}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}