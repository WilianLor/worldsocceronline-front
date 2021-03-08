import React from 'react'
import styled from 'styled-components'

import Stadium from '../images/Stadium.png'
import Logo from '../images/Logo.png'

const Landing: React.FC = () => {

        document.title = 'WSO | Início'
        document.body.style.background = "#121214"
        return (
            <LandingPage>
                <LandingContent>
                    <Title>
                        <Image src={Logo} alt="World Soccer Online" width="9rem"/>
                        <TitleH1>WSO</TitleH1>
                    </Title>
                    <Content>
                        <ContentH1>Torne-se o presidente ou técnico de qualquer time do mundo.</ContentH1>
                        <ContentP>Neste jogo todos os times são únicos, oque quer dizer que só você vai comandar o time que escolher no universo do jogo.</ContentP>
                    </Content>
                    <Buttons>
                        <Link href="/login">
                            <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
                            <LinkText>Entrar</LinkText>
                        </Link>
                        <Link href="/singup">
                            <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
                            <LinkText>Registrar-se</LinkText>
                        </Link>
                    </Buttons>
                </LandingContent>
                <LandingImage>
                    <Image src={Stadium} alt="Estádio de Futebol" width="28rem" />
                </LandingImage>
            </LandingPage>
        )
}

const LandingPage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 7vh;

    @media (max-width: 720px) {
        & {
            flex-direction: column;
        }
    }
`

const LandingContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LandingImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 720px) {
        & {
            width: 10rem;
        }
    }
`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    width: ${props => props.width};
`

const TitleH1 = styled.h1`
    font-size: 3.375rem;
    font-weight: 600;
    color: #04D361;
    margin-right: 12.5rem;

    @media (max-width: 720px) {
        margin-right: 0;
    }
`

const Content = styled.div`
    width: 28.125rem;
`

const ContentH1 = styled.h1`
    font-size: 2.25rem;
    font-weight: 600;
    color: #E1E1E6;
    margin-bottom: 1.875rem;

    @media (max-width: 720px) {
        & {
            text-align: center;
            margin-left: 5%;
            margin-right: 5%;
        }
    }
`

const ContentP = styled.p`
    font-size: 1rem;
    font-weight: 500;
    color: #CCCCCC;

    @media (max-width: 720px) {
        & {
            text-align: center;
            margin-left: 5%;
            margin-right: 5%;
        }
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 1.25rem;
    width: 28.125rem;
`

const Link = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    font-size: 1.5rem;
    color: #04D361;
    transition: .4s ease 0s;

    &:hover {
        color: #00ff7f;
    }
`

const LinkText = styled.h4`
    font-weight: 600;
    font-size: 1.5rem;
    margin-left: 0.625rem;
`

export default Landing