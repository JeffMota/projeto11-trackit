import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import ButtonSubmit from "../../components/ButtonSubmit"
import Loading from "../../components/Loading"
import { LogoContainer, LoginContainer, FormSignIn } from "./SignInStyle"


export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function sendSignInRequest(e){
        e.preventDefault()
        setLoading(true)

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const body = {
            email: email,
            name: name,
            image: image,
            password: password
        }

        const promise = axios.post(URL, body)
        promise.then(res => {
            setLoading(false)
            navigate('/')
        })
        promise.catch(err => {
            console.log(err)
            setLoading(false)
        })

    }

    return(
        <LoginContainer>
            <LogoContainer>
                <img src={logo} alt="logo"/>
            </LogoContainer>
            <FormSignIn onSubmit={e => sendSignInRequest(e)}>
                <input onChange={e => setEmail(e.target.value)} required placeholder="email" type="email"/>
                <input onChange={e => setPassword(e.target.value)} required placeholder="senha" type="password"/>
                <input onChange={e => setName(e.target.value)} required placeholder="nome" type="text"/>
                <input onChange={e => setImage(e.target.value)} required placeholder="foto" type="url"/>
                <ButtonSubmit text={loading ? <Loading /> : "Cadastrar"}/>
            </FormSignIn>
            <Link to={"/"}>Já tem uma conta? Faça login!</Link>
        </LoginContainer>
    )   
}