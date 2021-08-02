import styled from "styled-components";
import colors from "../../styles/colors";
import { Link } from "react-router-dom";

export const LandingPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  @media (max-width: 720px) {
    & {
      flex-direction: column;
    }
  }
`;

export const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LandingImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-left: 2rem;

  @media (max-width: 720px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: ${(props) => props.width};
`;

export const TitleH1 = styled.h1`
  font-size: 3.375rem;
  font-weight: 600;
  color: ${colors.green};
  margin-right: 12.5rem;

  @media (max-width: 720px) {
    margin-right: 0;
  }
`;

export const Content = styled.div`
  width: 28.125rem;
`;

export const ContentH1 = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${colors.lightGray};
  margin-bottom: 1.875rem;

  @media (max-width: 720px) {
    & {
      text-align: center;
      font-size: 1.5rem;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
`;

export const ContentP = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.lightGray};

  @media (max-width: 720px) {
    & {
      text-align: center;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 1.25rem;
  width: 28.125rem;
`;

export const LinkComponent = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${colors.green};
  transition: 0.4s ease 0s;

  &:hover {
    color: ${colors.lightGreen};
  }
`;

export const LinkText = styled.h4`
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: 0.625rem;
`;
