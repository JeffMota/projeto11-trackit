import axios from "axios"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import Loading from "../../components/Loading"
import GlobalContext from "../../contexts/GlobalContext"
import { LogoContainer, LoginContainer, FormLogin } from "./LoginStyle"


export default function Login(){
    const {setUser} = useContext(GlobalContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate("/habitos")
        }
    },[])

    function sendLoginRequest(e){
        e.preventDefault()
        setLoading(true)

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

        const body = {
            email: email,
            password: password
        }

        const promise = axios.post(URL, body)
        promise.then(res => {
            localStorage.setItem("user", JSON.stringify(res.data))

            setUser(res.data)
            navigate("/hoje")
        })
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
                <input data-test="email-input" disabled={loading} onChange={e => setEmail(e.target.value)} required placeholder="email" type="email"/>
                <input data-test="password-input" disabled={loading} onChange={e => setPassword(e.target.value)} required placeholder="senha" type="password"/>
                <button disabled={loading} type="submit" >{loading ? <Loading /> : "Entrar"}</button>
            </FormLogin>
            <Link data-test="signup-link" to={"/cadastro"}>Não tem uma conta? Cadastre-se!</Link>
        </LoginContainer>
    )   
}