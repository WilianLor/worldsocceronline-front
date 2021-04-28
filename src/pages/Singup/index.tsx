import { 
    useState, 
    useEffect 
} from 'react'

import axios, { AxiosResponse } from 'axios'

import config from '../../config/api.json'

import Logo from '../../images/Logo.png'

import {useDispatch} from 'react-redux'

import {
    login, 
    Payload
} from '../../store/actions'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { 
    ContentText, 
    Option, 
    Image, 
    ContentTitle, 
    ErrorMessage, 
    FormRegister, 
    FormTitle, 
    Link, 
    LinkSvg, 
    LinkToHome, 
    RegisterContent, 
    RegisterPage, 
    Section, 
} from './styles'
import colors from '../../styles/colors'

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
    document.body.style.background = colors.black
    return(
        <RegisterPage>
            <FormRegister>
                <FormTitle>Crie sua conta</FormTitle>
                <ErrorMessage>{error}</ErrorMessage>
                <Section>
                    
                    <Input icon="email" type="email" required name="email" id={emailFieldState} placeholder="E-mail" onChange={(e) => {setEmail(e.target.value); setEmailFieldState('email'); setError('')}}/>
                    <Input icon="user" type="text" required name="username" id={usernameFieldState} placeholder="Nome de usuário" onChange={(e) => {setUsername(e.target.value); setUsernameFieldState('username'); setError('')}}/>
   
                    <Select placeholder="Selecione uma país" required name="country" id={countryFieldState} onChange={(e) => {setCountry(e.target.value); setCountryFieldState('country'); setError('')}}>
                        {
                            listOfCountries.map((country: Country) => <Option key={country._id} value={country._id}>{country.name}</Option>)
                        }
                    </Select>
                  
                    <Input icon="password" type="password" required name="password" id={passwordFieldState} placeholder="Senha" onChange={(e) => {setPassword(e.target.value); setPasswordFieldState('password'); setPasswordConfirmFieldState('passwordConfirm'); setError('')}}/>
                    <Input icon="password" type="password" required name="passwordConfirm" id={passwordConfirmFieldState} placeholder="Confirmar senha" onChange={(e) => {setPasswordConfirm(e.target.value); setPasswordFieldState('password'); setPasswordConfirmFieldState('passwordConfirm'); setError('')} }/>

                </Section>
                <Button disabled={disableButtom} onClick={singup} title="REGISTRAR" loading={loading} size="large"/>
            </FormRegister>
            <RegisterContent>
                <LinkToHome href="/">
                    <Image src={Logo} alt="World Soccer Online" width="200px"/>
                </LinkToHome>
                <ContentTitle>Cadastre-se e se torne uma lenda.</ContentTitle>
                <ContentText>Seja um treinador ou presidente de qualquer clube do mundo do futebol</ContentText>
                <Link href="/login">
                    <LinkSvg>
                        <svg fill={colors.green} strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
                    </LinkSvg>
                    Voltar para login
                </Link>
            </RegisterContent>
        </RegisterPage>
    )
}

export default Singup