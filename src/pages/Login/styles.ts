import styled from "styled-components";
import colors from "../../styles/colors";
import { Link } from "react-router-dom";

export const ErrorMessage = styled.p`
  color: ${colors.red};
  height: 1.875rem;
  width: 100%;
`;

export const LoginPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 7.5rem;

  @media (max-width: 720px) {
    & {
      flex-direction: column;
      margin: 0;
    }
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2.5rem;
  align-items: center;

  @media (max-width: 720px) {
    margin-right: 0;
  }
`;

export const Image = styled.img`
  width: ${(props) => props.width};
`;

export const ContentText = styled.p`
  color: ${colors.lightGray};
  font-size: 3.375rem;
  line-height: 4rem;
  font-weight: bold;
  text-align: center;
  width: 30rem;

  @media (max-width: 720px) {
    margin-bottom: 2rem;
    width: 90%;
  }
`;

export const FormLogin = styled.form`
  background-color: ${colors.dark};
  width: 21.875rem;
  height: auto;
  padding-top: 2.125rem;
  padding-right: 4rem;
  padding-left: 4rem;
  padding-bottom: 4rem;
  border-radius: 0.3125rem;

  @media (max-width: 720px) {
    & {
      width: 18.875rem;
      margin-bottom: 2rem;
    }
  }
`;

export const Section = styled.section`
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
`;

export const LinkToHome = styled(Link)`
  text-decoration: none;
`;

export const LinkComponent = styled(Link)`
  color: ${colors.green};
  font-weight: 600;
  font-size: 0.875rem;
  transition: 0.4s ease 0s;

  &:hover {
    color: ${colors.lightGreen};
  }
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

export const RegisterText = styled.p`
  color: ${colors.lightGray};
  font-size: 0.875rem;
`;
