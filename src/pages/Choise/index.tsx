import axios, { AxiosResponse } from  'axios'

import Navbar from '../../components/Navbar'

import colors from '../../styles/colors'

import President from '../../images/president.png'
import Coach from '../../images/coach.png'

import config from '../../config/api.json'

import {
    useDispatch, 
    useSelector
} from 'react-redux'

import { UserState } from '../../store/userReducer'
import { login } from '../../store/actions'

import { 
    Body, 
    Button, 
    Image, 
    ChoisePage, 
    ContentText, 
    Title, 
    TitleContent, 
    TitleText 
} from './styles'

interface Token {
    token: string
}

const Choise: React.FC = () => {

    
    const dispatch = useDispatch()
    const infos = useSelector<UserState, Token>(state => ({token: state.token}))
    console.log(infos)
    const data = {}

    const createPresident = () => {
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl + '/create/president', data, header).then((response: AxiosResponse) => {  
            
            dispatch(login(response.data.data))
            window.location.href = "/findteam"
    
        }).catch(e => {
            console.log('erro: '+e)
        })
    }

    const createCoach = () => {
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl + '/create/coach',  data, header).then((response: AxiosResponse) => {
              
            dispatch(login(response.data.data))
            window.location.href = "/findteam"

        }).catch(e => {
            console.log('erro'+e)
        })
    }

    document.title = 'WSO | Escolha'
    document.body.style.background = colors.black
    return (
        <Body>
            <Navbar /> 
            <ChoisePage>
                <Button onClick={createPresident}>
                <Image src={President} alt="Técnico" width="6.25rem" />
                    <TitleContent className="title">
                        <Title>Presidente</Title>
                        <TitleText>P R O F I S S Ã O</TitleText>
                    </TitleContent>
                    <ContentText>
                        Faça contratos para jogadores e técnicos<br/>
                        Negocie com patrocinadores<br/>
                        Defina metas para o técnico<br/>
                        Cuide das finanças do clube<br/>
                        Escolha um técnico<br/>
                        Contrate jogadores<br/>
                    </ContentText>
                </Button>
                <Button onClick={createCoach}>
                    <Image src={Coach} alt="Técnico" width="6.25rem" />
                    <TitleContent className="title">
                        <Title>Técnico</Title>
                        <TitleText>P R O F I S S Ã O</TitleText>
                    </TitleContent>
                    <ContentText>
                        Dispute contra treinadores de todo o país<br/>
                        Peça contratações para o presidente<br/>
                        Escolha sua táticas e escalações<br/>
                        Defina sua filosofia de jogo<br/>
                        Encontre o time ideal<br/>
                        Conquiste títulos<br/>
                    </ContentText>
                </Button>
            </ChoisePage>
        </Body>
    )
}

export default Choise
