import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import ButtonSubmit from "../../components/ButtonSubmit"
import Loading from "../../components/Loading"
import { LogoContainer, LoginContainer, FormLogin } from "./LoginStyle"


export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    function sendLoginRequest(e){
        e.preventDefault()

        setLoading(true)
        console.log(email)
        console.log(password)
    }

    return(
        <LoginContainer>
            <LogoContainer>
                <img src={logo} alt="logo"/>
            </LogoContainer>
            <FormLogin onSubmit={e => sendLoginRequest(e)}>
                <input onChange={e => setEmail(e.target.value)} required placeholder="email" type="email"/>
                <input onChange={e => setPassword(e.target.value)} required placeholder="senha" type="password"/>
                <ButtonSubmit text={loading ? <Loading /> : "Entrar"}/>
            </FormLogin>
            <Link to={"/cadastro"}>Não tem uma conta? Cadastre-se!</Link>
        </LoginContainer>
    )   
}