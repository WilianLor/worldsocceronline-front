import styled from "styled-components";

import { Link } from "react-router-dom";
import colors from "../../styles/colors";

export const ResetPasswordPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.black};

  @media (max-width: 720px) {
    & {
      flex-direction: column;
      margin: 0;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.red};
  height: 1.875rem;
  width: 100%;
`;

export const RegisterText = styled.p`
  color: ${colors.lightGray};
  font-size: 0.875rem;
`;

export const LinkRegister = styled(Link)`
  margin-left: 0.3125rem;
  color: ${colors.green};
  font-weight: 600;
  font-size: 0.875rem;
  transition: 0.4s ease 0s;

  &:hover {
    color: ${colors.lightGreen};
  }
`;

export const RegisterDiv = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.lightGray};
`;

export const ResetPasswordForm = styled.form`
  background-color: transparent;
  width: 21.875rem;
  height: auto;
  border-radius: 0.3125rem;
  
  @media (max-width: 720px) {
    & {
      width: 18.875rem;
    }
  }
`;
