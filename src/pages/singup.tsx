import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios, { AxiosResponse } from 'axios'

import config from '../config/api.json'

import Logo from '../images/Logo.png'
import FlagIcon from '@material-ui/icons/Flag'
import DownArrow from '../images/arrowDown.png'
import CircularProgress from '@material-ui/core/CircularProgress';

import {useDispatch} from 'react-redux'

import {login, Payload} from '../store/actions'

interface Country {
    _id: string,
    name: string
}

const Singup: React.FC = () => { 

    const dispatch = useDispatch()

    const onLogin = (payload: Payload) => {
        dispatch(login(payload))
    }

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [country, setCountry] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [emailFieldState, setEmailFieldState] = useState('email')
    const [usernameFieldState, setUsernameFieldState] = useState('username')
    const [countryFieldState, setCountryFieldState] = useState('country')
    const [passwordFieldState, setPasswordFieldState] = useState('password')
    const [passwordConfirmFieldState, setPasswordConfirmFieldState] = useState('passwordConfirm')

    const [listOfCountries, setListOfCountries] = useState([])

    useEffect(() => {
        axios.get(config.baseUrl+'/countries').then((res: AxiosResponse)=> {
            setListOfCountries(res.data.countries)                
            return;
        })
    }, []);

    let emailPattern =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    const [error, setError] = useState('')

    const [disableButtom, setDisableButtom] = useState(false)

    const [loading, setLoading] = useState(false)

    const singup = () => {

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

        if(!username.length){
            setUsernameFieldState('Invalid')

            setError('Preencha o campo nome de usuário.')
            return;
        }

        if(username.length < 4){
            setUsernameFieldState('Invalid')

            setError('Nome de usuário muito pequeno.')
            return;
        }

        if(!country.length){
            setCountryFieldState('Invalid')

            setError('Escolha uma opção no campo pais.')
            return;
        }
        
        if(!password || !passwordConfirm){
            if(password === passwordConfirm){
                    setPasswordConfirmFieldState('Invalid')
                    setPasswordFieldState('Invalid')

                    setError('Preencha os campos senha, confirmar senha.')
                return;
            }
            else if(!password){
                setPasswordFieldState('Invalid')

                setError('Preencha o campo senha.')
                return;
            }
            else {
                setPasswordConfirmFieldState('Invalid')

                setError('Preencha o campo confirmar senha.')
                return;
            }
        }

        if(password !== passwordConfirm){
            setPasswordFieldState('Invalid')
            setPasswordConfirmFieldState('Invalid')

            setError('As senhas não correspondem.')
            return;
        }

        if(password.length < 4){
            setPasswordFieldState('Invalid')

            setError('A senha está muito pequena.')
            return;
        }

        const User = {
            email,
            username,
            countryId: country,
            password,
        }

        console.log(User)

        setLoading(true)

        setDisableButtom(true)

        axios.post(config.baseUrl+'/register', User).then((response: AxiosResponse) => {

            if(response.data.error){
                setError(response.data.error)
                setLoading(false)
                setDisableButtom(false)
                return;
            }
                
            setLoading(false)
            onLogin(response.data.data)
            window.location.href = "/choise"
            return;

        }).catch(e => {
            setError('Falha na requisição.')
            setDisableButtom(false)
            setLoading(false)
            return;
        })

    } 

    document.title = 'WSO | Registrar-se'
    document.body.style.background = "#121214"
    return(
        <RegisterPage>
            <FormRegister>
                <FormTitle>Crie sua conta</FormTitle>
                <ErrorMessage>{error}</ErrorMessage>
                <Section>
                    <Fields>
                        <Svg>
                            <svg  fill="#04D361" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                        </Svg>
                        <Input type="email" required name="email" id={emailFieldState} placeholder="E-mail" onChange={(e) => {setEmail(e.target.value); setEmailFieldState('email'); setError('')}}/>
                    </Fields>
                    <Fields className="input" id="username">
                        <Svg>
                            <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                        </Svg>
                        <Input type="text" required name="username" id={usernameFieldState} placeholder="Nome de usuário" onChange={(e) => {setUsername(e.target.value); setUsernameFieldState('username'); setError('')}}/>
                    </Fields>
                    <FieldSelect className="select" id="country">
                        <SvgSelect>
                            <FlagIcon style={{color: "#04D361"}}/>
                        </SvgSelect>
                        <Select required name="country" id={countryFieldState} onChange={(e) => {setCountry(e.target.value); setCountryFieldState('country'); setError('')}}>
                            <Option value="" >Selecione um pais</Option>
                            {
                                listOfCountries.map((country: Country) => <Option key={country._id} value={country._id}>{country.name}</Option>)
                            }
                        </Select>
                        </FieldSelect>
                        <Fields className="input">
                            <Svg>
                                <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                            </Svg>
                            <Input type="password" required name="password" id={passwordFieldState} placeholder="Senha" onChange={(e) => {setPassword(e.target.value); setPasswordFieldState('password'); setPasswordConfirmFieldState('passwordConfirm'); setError('')}}/>
                        </Fields>
                        <Fields className="input" id="password">
                            <Svg>
                                <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                            </Svg>
                            <Input type="password" required name="passwordConfirm" id={passwordConfirmFieldState} placeholder="Confirmar senha" onChange={(e) => {setPasswordConfirm(e.target.value); setPasswordFieldState('password'); setPasswordConfirmFieldState('passwordConfirm'); setError('')} }/>
                        </Fields>
                    </Section>
                    <Button disabled={disableButtom} onClick={singup}>{ loading ? <CircularProgress style={{color: "#fff"}}/> :"REGISTRAR"}</Button>
                </FormRegister>
                <RegisterContent>
                    <LinkToHome href="/">
                        <Image src={Logo} alt="World Soccer Online" width="200px"/>
                    </LinkToHome>
                    <ContentTitle>Cadastre-se e se torne uma lenda.</ContentTitle>
                    <ContentText>Seja um treinador ou presidente de qualquer clube do mundo do futebol</ContentText>
                    <Link href="/login">
                        <LinkSvg>
                            <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
                        </LinkSvg>
                        Voltar para login
                    </Link>
                </RegisterContent>
            </RegisterPage>
        )
}

const ErrorMessage = styled.p`
    color: #F44336;
    height: 1.875rem;
    width: 100%;
`


const RegisterPage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 2.5rem;

    @media (max-width: 720px) {
        & {
            flex-direction: column-reverse;
        }
    }
`

const FormRegister = styled.div`
    background-color: #202024;
    width: 21.875rem;
    height: auto;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border-radius: 0.3125rem;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }
`

const FormTitle = styled.h1`
    color: #E1E1E6;
    font-size: 1.5625rem;
    margin-bottom: 0.625rem;
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

const FieldSelect = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #121214 url(${DownArrow}) 95.5% 50% no-repeat;
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

const Svg = styled.div`
    margin-left: 1.25rem;
`

const SvgSelect = styled.div`
    margin-left: 1rem;
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

const Option = styled.option`
    
    color: #E1E1E6;
    font-size: 1rem;
    background-color: #121214;
    line-height: 12.5rem;

    &:hover {
        background-color: #202024;
    }

    &[value=""][disabled] {
        display: none;
    }
      
`

const Select = styled.select`
    background: none;
    height: 3.375rem;
    width: 21.9375rem;
    font-size: 1rem;
    font: 400 Arial;
    color: #E1E1E6; 
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: .625rem;
    position: absolute;
    border-radius: .3125rem;
    border: .125rem solid #202024;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    @media (max-width: 720px) {
        & {
            width: 18.9375rem;
        }
    }

    &#Invalid {
        border: .125rem solid #F44336;
    }

    &:focus {
        border: .125rem solid  #04D361;
    }

    &:required:invalid {
        color: gray;
    }
`

const Link = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: .875rem;
    font-weight: 600;
    color: #04D361;
    transition: .2s ease 0s;

    @media (max-width: 720px) {
        & {
            margin-bottom: 2rem;
        }
    }

    &:hover {
        color: #00ff7f;
    }
`

const LinkSvg = styled.div`
    margin-right: 0.625rem;
`

const LinkToHome = styled.a`
    text-decoration: none;
`

const Image = styled.img`
    width: ${props => props.width}
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

    &:hover {
        background-color: #00ff7f;
    }
`

const RegisterContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 6.25rem;

    @media (max-width: 720px) {
        & {
            margin: 0;
            align-items: center;
        }
    }
`

const ContentTitle = styled.h1`
    color: #E1E1E6;
    font-size: 2.25rem;
    font-weight: 600;
    width: 15.625rem;
    margin-bottom: 3.125rem;

    @media (max-width: 720px) {
        & {
            text-align: center;
        }
    }
`

const ContentText = styled.p`
    color: rgb(168, 168, 179);
    font-size: 1rem;
    font-weight: 500;
    width: 21.875rem;
    margin-bottom: 3.125rem;
    
    @media (max-width: 720px) {
        & {
            text-align: center;
        }
    }
`

export default Singup