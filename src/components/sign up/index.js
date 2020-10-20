import React, {useState } from 'react';
import {Modal, StyledSignUp, Container, Container1} from "./style";
import {TextField, Button} from '@material-ui/core/';

export const SingUp = () =>{

    const [open,setOpen] = useState(false)
    const toggleModal =  () => {
        setOpen(!open)
    }

    const [data, setData] = useState("");

    return(
        <Container>
            {open && <SingUp toggleModal={toggleModal}/>}
            <StyledSignUp/>
                <Modal>
                    <form>
                        <TextField label={"FIO"} onChange={(e) => setData(e.target.value)}/>
                    </form>
                    <Container1>
                        <Button onClick={toggleModal}>Отправить</Button>
                    </Container1>
                </Modal>
        </Container>

    )
}