import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetDTPsForDriver = () => {

    const {toggleGetDTPsForDriver,dataGetDTPsForDriver} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetDTPsForDriver}/>
            <Modal>
                <div>ID ДТП:{dataGetDTPsForDriver[0]}</div>
                <div>ID машины:{dataGetDTPsForDriver[1]}</div>
                <div>Номер лицензии пострадавшего:{dataGetDTPsForDriver[2]}</div>
                <div>Дата ДТП:{dataGetDTPsForDriver[3]}</div>
                <div>Статус подтверждения:{dataGetDTPsForDriver[4]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetDTPsForDriver}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}