import { useContext, useEffect } from "react"
import styled from "styled-components"
import logo from "../assets/img/TrackIt.png"
import GlobalContext from "../contexts/GlobalContext"

export default function Header() {

    const {user} = useContext(GlobalContext)

    return (
        <HeaderContainer data-test="header">
            <ImgLogo src={logo}></ImgLogo>
            <ImgPerfil src={user.image} />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-shadow: 0 5px 5px lightgray;

    padding: 0 18px;

    width: 100%;
    height: 70px;

    position: fixed;
    left: 0;
    top: 0;

    z-index: 1;

    background-color: #126BA5;
`

const ImgLogo = styled.img`
    width: 97px;
    height: 35px;
`
const ImgPerfil = styled.img`
    display: block;
    width: 51px;
    height: 51px;

    object-fit: cover;

    border-radius: 50%;
`