import { createGlobalStyle } from "styled-components";
import styled from "styled-components"

export const GlobalStyle = createGlobalStyle`

body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100%;

}
#root {
    height: 100vh;
    width: 100%;
}

`;

export const Main = styled.div`
display: flex;
`