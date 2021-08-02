import {
  SendMailForm,
  SendMailPage,
  ErrorMessage,
  Title,
  RegisterText,
  RegisterDiv,
  LinkRegister,
} from "./styles";

import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";

import axios from "axios";
import config from "../../config/api.json";

import Toast from "../../components/Toast";

const SendMail = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailFieldState, setEmailFieldState] = useState("email");
  const [error, setError] = useState("");
  const [disableButtom, setDisableButtom] = useState(false);

  const emailPattern =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const onSendMail = () => {
    setDisableButtom(true);

    if (!email.length) {
      setEmailFieldState("Invalid");
      setDisableButtom(false);
      setError("Preencha o campo email.");
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailFieldState("Invalid");
      setDisableButtom(false);
      setError("Insira um email válido.");
      return;
    }

    axios
      .post(config.baseUrl + "/forgot-password", { email })
      .then((response) => {
        if (response.status === 200) {
          Toast(`Email enviado para ${email}`, true);

          history.push("/login");
        } else if (response.status === 204) {
          setDisableButtom(false);
          Toast('Este email não está cadastrado.', false);
        }
      })
      .catch((err) => {
        Toast('Erro interno', false);
        setDisableButtom(false);
      });
  };

  return (
    <SendMailPage>
      <SendMailForm onSubmit={(e) => e.preventDefault()}>
        <Title>Recuperar senha</Title>
        <ErrorMessage>{error}</ErrorMessage>
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
        <Button
          disabled={disableButtom}
          onClick={onSendMail}
          size="large"
          title="ENVIAR EMAIL"
          style={{ marginTop: 0 }}
        />
        <RegisterDiv>
          <RegisterText>Lembrou sua senha?</RegisterText>
          <LinkRegister to="/login"> Entrar</LinkRegister>
        </RegisterDiv>
      </SendMailForm>
    </SendMailPage>
  );
};

export default SendMail;
