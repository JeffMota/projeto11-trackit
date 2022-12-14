import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import ButtonSubmit from "../../components/ButtonSubmit"
import { LogoContainer, LoginContainer, FormLogin, FormSignIn } from "./SignInStyle"


export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')

    function sendLoginRequest(e){
        e.preventDefault()
        console.log(email)
        console.log(password)
    }

    return(
        <LoginContainer>
            <LogoContainer>
                <img src={logo} alt="logo"/>
            </LogoContainer>
            <FormSignIn onSubmit={e => sendLoginRequest(e)}>
                <input onChange={e => setEmail(e.target.value)} required placeholder="email" type="email"/>
                <input onChange={e => setPassword(e.target.value)} required placeholder="senha" type="password"/>
                <input onChange={e => setName(e.target.value)} required placeholder="senha" type="text"/>
                <input onChange={e => setPicture(e.target.value)} required placeholder="senha" type="url"/>
                <ButtonSubmit text={"Cadastrar"}/>
            </FormSignIn>
            <Link to={"/"}>Já tem uma conta? Faça login!</Link>
        </LoginContainer>
    )   
}