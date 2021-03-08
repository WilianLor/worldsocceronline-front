import React from 'react'
import styled from 'styled-components'
import axios, { AxiosResponse } from  'axios'

import Navbar from '../components/navbar'

import President from '../images/president.png'
import Coach from '../images/coach.png'

import config from '../config/api.json'

import {useDispatch, useSelector} from 'react-redux'
import { UserState } from '../store/userReducer'
import { login } from '../store/actions'

interface Token {
    token: string
}

const Choise: React.FC = () => {

    const dispatch = useDispatch()
    const infos = useSelector<UserState, Token>(state => ({token: state.token}))

    const data = {}

    const createPresident = () => {
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl + '/create/president', data, header).then((response: AxiosResponse) => {  
            
            window.location.href = "/findteam"
            dispatch(login(response.data.data))
    
        }).catch(e => {
            console.log('erro: '+e)
        })
    }

    const createCoach = () => {
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl + '/create/coach',  data, header).then((response: AxiosResponse) => {
              
            window.location.href = "/findteam"
            dispatch(login(response.data.data))

        }).catch(e => {
            console.log('erro'+e)
        })
    }

    document.title = 'WSO | Escolha'
    document.body.style.background = "#121214"
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

const Body = styled.div`
    display: flex;
    flex-direction: column;
`

const ChoisePage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 5vh;
    margin-left: 2vw;
    margin-right: 2vw;

    @media (max-width: 720px) {
        & {
            flex-direction: column;        
        }
    }
`

const Button = styled.button`
    cursor: pointer;
    height: 80vh;
    width: 46vw;
    border-radius: 0.625rem 0.625rem 0 0;
    border-bottom: 0.125rem solid #04D361;
    transition: .4s ease-in;
    background-color: #202024;

    @media (max-width: 720px) {
        & {
            width: 92vw;
            margin-bottom: 1rem;        
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    &:hover {
        margin-top: 0.625rem;
        border: 0.125rem solid #04D361;
    }
`

const Image = styled.img`
    width: ${props => props.width};
    margin-bottom: 1.25rem;
`

const TitleContent = styled.div`
    margin-bottom: 0.625rem;
`

const Title = styled.h1`
    font-size: 2.25rem;
    color: #E1E1E6;
`

const TitleText = styled.p`
    color: #04D361;
    font-weight: 600;
`

const ContentText = styled.p`
    font-size: 1rem;
    color: #CCCCCC;
    line-height: 1.875rem;
`

export default Choise
