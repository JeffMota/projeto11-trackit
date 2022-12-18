import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;

    align-items: center;

    display: flex;
    flex-direction: column;

    background-color: #ffffff;

    >a{
        color: #52B6FF;
    }
`

export const LogoContainer = styled.div`
    width: 200px;
    margin-top: 50px;

    > img{
        width: 100%;
    }

`

export const FormSignIn = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;

    justify-content: space-around;
    margin-top: 50px;
    margin-bottom: 30px;

    height: 250px;

    >input, button{
        height: 45px;
        border-radius: 5px;
        padding: 10px;

        font-size: 20px;
        color: #DBDBDB;

        border: 1px solid #D4D4D4;
    }

    >input:focus{
        color: black;
    }

    >button{
        display: flex;
        justify-content: center;
        align-items:center;
        background-color: #52B6FF;
        color: #ffff;

        font-size: 20px;

        border: none;
    }

    >button:disabled{
        background-color: #52B6FF;
    }

`