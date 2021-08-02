import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from 'react-router-dom'

import Logo from "../../images/Logo.png";

import config from "../../config/api.json";

import useData from '../../hooks/useData'

import Button from "../../components/Button";
import Input from "../../components/Input";

import {
  ContentText,
  Image,
  ErrorMessage,
  FormLogin,
  LinkComponent,
  LinkRegister,
  LinkToHome,
  LoginContent,
  LoginPage,
  RegisterDiv,
  RegisterText,
  Section,
} from "./styles";
import colors from "../../styles/colors";

const Login: React.FC = () => {

  const history = useHistory();

  const { setUser } = useData()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailFieldState, setEmailFieldState] = useState("email");
  const [passwordFieldState, setPasswordFieldState] = useState("password");

  const [error, setError] = useState("");

  const [disableButtom, setDisableButtom] = useState(false);

  let emailPattern =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const onLogin = (response: AxiosResponse) => {
    localStorage.setItem('WSO_USER_TOKEN', response.data.data.token)
    setUser({
      isLogged: true,
      token: response.data.data.token,
      profession: response.data.data.profession,
      user: response.data.data.user
    })
  };

  const toLogin = () => {
    if (!email.length) {
      setEmailFieldState("Invalid");

      setError("Preencha o campo email.");
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailFieldState("Invalid");

      setError("Insira um email válido.");
      return;
    }

    if (!password.length) {
      setPasswordFieldState("Invalid");

      setError("Preencha o campo senha.");
      return;
    }

    const User = {
      email,
      password,
    };

    setDisableButtom(true);

    axios
      .post(config.baseUrl + "/login", User)
      .then((response: AxiosResponse) => {
        if (response.data.error) {
          setError(response.data.error);
          setDisableButtom(false);
          return;
        }

        onLogin(response);
        if (response.data.data.profession !== "") {
          history.push("/home");
        } else {
          history.push("/choise");
        }
        return;
      })
      .catch((e) => {
        setError("Falha na requisição.");
        setDisableButtom(false);
        return;
      });
  };

  document.title = "WSO | Entrar";
  document.body.style.background = colors.black;
  return (
    <LoginPage>
      <LoginContent>
        <LinkToHome to="/">
          <Image src={Logo} alt="World Soccer Online" width="200px" />
        </LinkToHome>
        <ContentText>Entrar no World Soccer Online</ContentText>
      </LoginContent>
      <FormLogin onSubmit={(e) => e.preventDefault()}>
        <ErrorMessage>{error}</ErrorMessage>
        <Section>
          <Input
            icon="email"
            type="email"
            name="email"
            id={emailFieldState}
            placeholder="Digite seu email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailFieldState("email");
              setError("");
            }}
          />
          <Input
            icon="password"
            type="password"
            name="password"
            id={passwordFieldState}
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordFieldState("senha");
              setError("");
            }}
          />
        </Section>
        <LinkComponent to="/sendmailreset">Esqueci minha senha</LinkComponent>
        <Button
          disabled={disableButtom}
          onClick={toLogin}
          size="large"
          title="ENTRAR"
        />
        <RegisterDiv>
          <RegisterText>Não tem uma conta?</RegisterText>
          <LinkRegister to="/signup"> Registre-se</LinkRegister>
        </RegisterDiv>
      </FormLogin>
    </LoginPage>
  );
};

export default Login;
