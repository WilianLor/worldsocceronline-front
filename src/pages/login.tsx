import React, {useState} from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios, { AxiosResponse } from 'axios'

import Logo from '../images/Logo.png'
import { useDispatch } from 'react-redux';
import { login, Payload } from '../store/actions';
import config from '../config/api.json'

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailFieldState, setEmailFieldState] = useState('email')
    const [passwordFieldState, setPasswordFieldState] = useState('password')

    const [error, setError] = useState('')

    const [disableButtom, setDisableButtom] = useState(false)

    const [loading, setLoading] = useState(false)

    let emailPattern =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    const dispatch = useDispatch()

    const onLogin = (payload: Payload) => {
        dispatch(login(payload))
    }

    const toLogin = () => {

        if(!email.length) {
            setEmailFieldState('Invalid')

            setError('Preencha o campo email.')
            return;
        }

        if(!emailPattern.test(email)){
            setEmailFieldState('Invalid')

            setError('Insira um email válido.')
            return;
        }

        if(!password.length) {
            setPasswordFieldState('Invalid')

            setError('Preencha o campo senha.')
            return;
        }

        const User = {
            email,
            password,
        }

        setDisableButtom(true)

        setLoading(true)

        axios.post(config.baseUrl+'/login', User).then((response: AxiosResponse) => {

            if(response.data.error){
                setError(response.data.error)
                setLoading(false)
                setDisableButtom(false)
                return;
            }
                
            setLoading(false)
            onLogin(response.data.data)
            if(response.data.data.profession !== ""){
                window.location.href = "/home"
            } else {
                window.location.href = "/choise"
            }
            return;

        }).catch(e => {
            setError('Falha na requisição.')
            setDisableButtom(false)
            setLoading(false)
            return;
        })


    }

    document.title = 'WSO | Entrar'
    document.body.style.background = "#121214"
    return (
        <LoginPage>
            <LoginContent>
                <LinkToHome href="/">
                    <Image src={Logo} alt="World Soccer Online" width="200px"/>
                </LinkToHome>
                <ContentText>
                    Entrar no World Soccer Online
                </ContentText>
            </LoginContent>
            <FormLogin>
                <ErrorMessage>{error}</ErrorMessage>
                <Section>
                    <Fields>
                        <Svg>
                            <svg  fill="#04D361" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                        </Svg>
                        <Input type="email" name="email" id={emailFieldState} placeholder="Digite seu email" onChange={(e) => {setEmail(e.target.value); setEmailFieldState('email'); setError('')}}/>
                    </Fields>
                    <Fields >
                        <Svg>
                            <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                        </Svg>
                        <Input type="password" name="password" id={passwordFieldState} placeholder="Senha" onChange={(e) => {setPassword(e.target.value); setPasswordFieldState('senha'); setError('')}}/>
                    </Fields>
                    </Section>
                    <Link href="/">Esqueci minha senha</Link>
                    <Button disabled={disableButtom} onClick={toLogin}>{loading ? <CircularProgress style={{color: "#fff"}}/>:"ENTRAR"}</Button>
                    <RegisterDiv>
                        <RegisterText>Não tem uma conta?</RegisterText>
                        <LinkRegister href="/singup"> Registre-se</LinkRegister>
                    </RegisterDiv>
                </FormLogin>    
            </LoginPage>
        )
}

const ErrorMessage = styled.p`
    color: #F44336;
    height: 1.875rem;
    width: 100%;
`

const LoginPage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 7.5rem;

    @media (max-width: 720px) {
        & {
            flex-direction: column;
            margin: 0;
        }
    }
`

const LoginContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 2.5rem;
    align-items: center;

    @media (max-width: 720px) {
        margin-right: 0;
    }
`

const Image = styled.img`
    width: ${props => props.width};
`

const ContentText = styled.p`
    color: #E1E1E6;
    font-size: 3.375rem;
    line-height: 4rem;
    font-weight: bold;
    text-align: center;
    width: 30rem;

    @media (max-width: 720px) {
        margin-bottom: 2rem;
        width: 90%;
    }
`

const FormLogin = styled.div`
    background-color: #202024;
    width: 21.875rem;
    height: auto;
    padding-top: 2.125rem;
    padding-right: 4rem;
    padding-left: 4rem;
    padding-bottom: 4rem;
    border-radius: 0.3125rem;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
            margin-bottom: 2rem;
        }
    }
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 21.875rem;
    height: auto;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }
`

const Fields = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #121214;
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }
`

const Input = styled.input`
    background: none;
    height: 3.125rem;
    width: 17.9375rem;
    font-size: 1rem;
    color: #E1E1E6;
    font: 400 Arial;
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: 0.625rem;
    position: absolute;
    border-radius: 0.3125rem;
    border: 0.125rem solid #202024;

    @media (max-width: 720px) {
        & {
            width: 14.9375rem;
        }
    }

    &#Invalid {
        border: 0.125rem solid #F44336;
    }

    &:-ms-input-placeholder {  
        color: #202024;  
    }

    &:focus {
        border: 0.125rem solid  #04D361;
    }
`

const Svg = styled.div`
    margin-left: 1.25rem;
`

const LinkToHome = styled.a`
    text-decoration: none;
`


const Link = styled.a`
    color: #04D361;
    font-weight: 600;
    font-size: 0.875rem;
    transition: .4s ease 0s;

    &:hover {
        color:#00ff7f;
    }
`

const LinkRegister = styled(Link)`
    margin-left: 0.3125rem;
`

const Button = styled.button`
    width: 21.875rem;
    height: 3.125rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #04D361;
    border-radius: 0.3125rem;
    color: #E1E1E6;
    cursor: pointer;
    margin-top: 1.875rem;
    transition: .4s ease 0s;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }

    &:hover{
        background-color: #00ff7f;
    }
`

const RegisterDiv = styled.div`
    margin-top: 1.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const RegisterText = styled.p`
    color: #CCCCCC;
    font-size: 0.875rem;
`

export default Login