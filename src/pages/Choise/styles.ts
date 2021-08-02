import styled from "styled-components";

import colors from "../../styles/colors";

export const Body = styled.div`
  flex: 1;
`;

export const ChoisePage = styled.div`
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
`;

export const Button = styled.button`
  cursor: pointer;
  height: 80vh;
  width: 46vw;
  border-radius: 0.625rem 0.625rem 0 0;
  border-bottom: 0.125rem solid ${colors.green};
  transition: 0.4s ease-in;
  background-color: ${colors.dark};

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
    border: 0.125rem solid ${colors.green};
  }
`;

export const Image = styled.img`
  width: ${(props) => props.width};
  margin-bottom: 1.25rem;
`;

export const TitleContent = styled.div`
  margin-bottom: 0.625rem;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  color: ${colors.lightGray};
`;

export const TitleText = styled.p`
  color: ${colors.green};
  font-weight: 600;
`;

export const ContentText = styled.p`
  font-size: 1rem;
  color: ${colors.lightGray};
  line-height: 1.875rem;
`;
