import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'Lexend Deca', sans-serif;
    }
    body{
        background-color: #F2F2F2;
    }
`

export default GlobalStyle