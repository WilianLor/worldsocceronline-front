import { useState } from "react";
import {
  ErrorMessage,
  LinkRegister,
  RegisterDiv,
  RegisterText,
  ResetPasswordForm,
  ResetPasswordPage,
  Title,
} from "./styles";

import axios from 'axios'
import config from '../../config/api.json'

import { useHistory, useParams } from "react-router-dom";

import Toast from "../../components/Toast";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { RouteParams } from './types'

const ResetPassword = () => {
  const history = useHistory();
  const { userId, token } = useParams<RouteParams>();

  const [password, setPassword] = useState("");
  const [passwordFieldState, setPasswordFieldState] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFieldState, setConfirmPasswordFieldState] =
    useState("password");
  const [error, setError] = useState("");
  const [disableButtom, setDisableButtom] = useState(false);

  const onResetPassword = () => {
    setDisableButtom(true)

    if (!password.length) {
      setPasswordFieldState("Invalid");
      setDisableButtom(false)
      setError("Preencha o campo senha.");
      return;
    }

    if (!confirmPassword.length) {
      setConfirmPasswordFieldState("Invalid");
      setDisableButtom(false)
      setError("Preencha o campo de confirmar senha.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordFieldState("Invalid");
      setConfirmPasswordFieldState("Invalid");
      setDisableButtom(false)
      setError("As senhas não correspondem");
      return;

    }

    axios.post(config.baseUrl+'/reset-password', {password, token, userId}).then(response => {
      console.log(response)
      if(response.status === 200) {
        Toast("Senha alterada com sucesso!", true);
        setDisableButtom(false)
        history.push("/login");                    
      } else {
        Toast('O link da página foi alterado ou o token está expirado!', false);
        setDisableButtom(false)
      }
    })

  };

  return (
    <ResetPasswordPage>
      <ResetPasswordForm onSubmit={(e) => e.preventDefault()}>
        <Title>Resetar senha</Title>
        <ErrorMessage>{error}</ErrorMessage>
        <Input
          icon="password"
          type="password"
          name="password"
          id={passwordFieldState}
          placeholder="Digite sua nova senha"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordFieldState("password");
            setError("");
          }}
        />
        <Input
          icon="password"
          type="password"
          name="password"
          id={confirmPasswordFieldState}
          placeholder="Confirme sua senha"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordFieldState("password");
            setError("");
          }}
        />
        <Button
          disabled={disableButtom}
          onClick={onResetPassword}
          size="large"
          title="CONFIRMAR"
          style={{ marginTop: 0 }}
        />
        <RegisterDiv>
          <RegisterText>Lembrou sua senha?</RegisterText>
          <LinkRegister to="/login"> Entrar</LinkRegister>
        </RegisterDiv>
      </ResetPasswordForm>
    </ResetPasswordPage>
  );
};

export default ResetPassword;
