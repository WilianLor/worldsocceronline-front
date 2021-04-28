import {useState} from 'react'
import axios, { AxiosResponse } from 'axios'

import Logo from '../../images/Logo.png'
import { useDispatch } from 'react-redux';

import { 
    login, 
    Payload 
} from '../../store/actions';

import config from '../../config/api.json'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { 
    ContentText, 
    Image, 
    ErrorMessage, 
    FormLogin, 
    Link, 
    LinkRegister, 
    LinkToHome, 
    LoginContent, 
    LoginPage, 
    RegisterDiv, 
    RegisterText, 
    Section, 
} from './styles'
import colors from '../../styles/colors';

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
    document.body.style.background = colors.black
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
                    <Input icon="email" type="email" name="email" id={emailFieldState} placeholder="Digite seu email" onChange={(e) => {setEmail(e.target.value); setEmailFieldState('email'); setError('')}}/>
                    <Input icon="password" type="password" name="password" id={passwordFieldState} placeholder="Senha" onChange={(e) => {setPassword(e.target.value); setPasswordFieldState('senha'); setError('')}}/>
                </Section>
                    <Link href="/">Esqueci minha senha</Link>
                    <Button disabled={disableButtom} onClick={toLogin} size="large" title="ENTRAR" loading={loading} />
                    <RegisterDiv>
                        <RegisterText>Não tem uma conta?</RegisterText>
                        <LinkRegister href="/singup"> Registre-se</LinkRegister>
                    </RegisterDiv>
                </FormLogin>    
            </LoginPage>
        )
}

export default Login