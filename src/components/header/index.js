import React from 'react';
import {Headerstyle,Container} from "./style";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

export const Header = ({toggleModal}) => {
    return(
        <Headerstyle>
                <>Безопасносное дорожное движение</>
                <Container>
                        <AccountCircleRoundedIcon onClick={toggleModal}/>
                </Container>
        </Headerstyle>
        )
}

