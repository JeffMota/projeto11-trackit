import axios from "axios"
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

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

        const body = {
            email: email,
            password: password
        }

        const promise = axios.post(URL, body)
        promise.then(res => console.log(res))
        promise.catch(err => {
            console.log(err)
            setLoading(false)
            alert("Email ou senha incorretos")
        })

    }

    return(
        <LoginContainer>
            <LogoContainer>
                <img src={logo} alt="logo"/>
            </LogoContainer>
            <FormLogin onSubmit={e => sendLoginRequest(e)}>
                <input disabled={loading} onChange={e => setEmail(e.target.value)} required placeholder="email" type="email"/>
                <input disabled={loading} onChange={e => setPassword(e.target.value)} required placeholder="senha" type="password"/>
                <ButtonSubmit disabled={loading} text={loading ? <Loading /> : "Entrar"}/>
            </FormLogin>
            <Link to={"/cadastro"}>Não tem uma conta? Cadastre-se!</Link>
        </LoginContainer>
    )   
}