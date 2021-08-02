import React from 'react'
import Logo from "../../images/Logo.png";
import animationData from "../../images/soccer-field.json";

import Lottie from "react-lottie";

import {
  Buttons,
  Image,
  Content,
  ContentH1,
  ContentP,
  LandingContent,
  LandingImage,
  LandingPage,
  LinkComponent,
  LinkText,
  Title,
  TitleH1,
} from "./styles";
import colors from "../../styles/colors";

const Landing: React.FC = () => {
  document.title = "WSO | Início";
  document.body.style.background = colors.black;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <LandingPage>
      <LandingContent>
        <Title>
          <Image src={Logo} alt="World Soccer Online" width="9rem" />
          <TitleH1>WSO</TitleH1>
        </Title>
        <Content>
          <ContentH1>
            Torne-se o presidente ou técnico de qualquer time do mundo.
          </ContentH1>
          <ContentP>
            Neste jogo todos os times são únicos, oque quer dizer que só você
            vai comandar o time que escolher no universo do jogo.
          </ContentP>
        </Content>
        <Buttons>
          <LinkComponent to="/login">
            <svg
              fill={colors.green}
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
            </svg>
            <LinkText>Entrar</LinkText>
          </LinkComponent>
          <LinkComponent to="/singup">
            <svg
              fill={colors.green}
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
            </svg>
            <LinkText>Registrar-se</LinkText>
          </LinkComponent>
        </Buttons>
      </LandingContent>
      <LandingImage>
        <Lottie options={defaultOptions} width="24rem" />
      </LandingImage>
    </LandingPage>
  );
};

export default Landing;
