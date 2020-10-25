import React, {useContext} from 'react';
import {Modal, StyledSignUp, Container, ButtonContainer} from "./styledModal";
import {Button} from '@material-ui/core/';
import {DataContext} from "../../contexts/DataContext";


export const UseGetInsuranceRequests = () => {

    const {toggleGetInsuranceRequests,dataGetInsuranceRequests} = useContext(DataContext);

    return(
        <Container>
            <StyledSignUp  onClick={toggleGetInsuranceRequests}/>
            <Modal>
                <div>ID запроса на страховку:{dataGetInsuranceRequests[0]}</div>
                <div>ID человека запрашивающего страховку:{dataGetInsuranceRequests[1]}</div>
                <div>Фамилия запрашивающего страховку:{dataGetInsuranceRequests[2]}</div>
                <div>ID машины:{dataGetInsuranceRequests[3]}</div>
                <div>Адресс запрашивающего страховку в системе:{dataGetInsuranceRequests[4]}</div>
                <ButtonContainer>
                    <Button onClick={toggleGetInsuranceRequests}>Отправить</Button>
                </ButtonContainer>
            </Modal>
        </Container>

    )
}