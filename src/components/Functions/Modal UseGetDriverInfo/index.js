import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ModalContainer} from "./style";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";

export const UseGetDriverInfo = () =>{

    const {toggleGetDriverInfo} = useContext(DataContext);


    const {dataGetDriverInfo} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetDriverInfo}/>
                <Modal>
                    <div>ID водителя:{dataGetDriverInfo[0]}</div>
                    <div>ФИО:{dataGetDriverInfo[1]}</div>
                    <div>Адрес в системе:{dataGetDriverInfo[2]}</div>
                    <div>Номер лицензии:{dataGetDriverInfo[3]}</div>
                    <div>Стаж воздения:{dataGetDriverInfo[4]}</div>
                    <div>Количество ДТП:{dataGetDriverInfo[5]}</div>
                    <div>Неоплаченные штрафы:{dataGetDriverInfo[6]}</div>
                    <div>Баланс:{dataGetDriverInfo[7]}</div>
                    <div>Статус страховки:{dataGetDriverInfo[8]}</div>
                    <ModalContainer>
                        <Button onClick={toggleGetDriverInfo}>Отправить</Button>
                    </ModalContainer>
                </Modal>
        </Container>

    )
}