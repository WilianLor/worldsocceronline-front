import styled from "styled-components";
import colors from "../../styles/colors";
import { Link } from 'react-router-dom'

export const Body = styled.div`
  flex: 1;
`;

export const ErrorOption = styled.h1`
  color: ${colors.lightGray};
  font-weight: 500;
`;

export const ActionButton = styled.button`
  margin-top: 1.25rem;
  color: ${colors.lightGray};
  background-color: ${colors.green};
  padding: 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: 0.4s;
  cursor: pointer;
  width: 14rem;
  height: 2.5rem;

  &:hover {
    background-color: ${colors.lightGreen};
  }
`;

export const GoBackContent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;

  margin-bottom: -1.2rem;
`;

export const ButtonGoBack = styled.button`
  border-radius: 0.5rem;
  background-color: ${colors.dark};
  color: ${colors.lightGray};
  margin-left: 0.625rem;
  padding: 0.625rem;
  transition: 0.4s ease 0s;
  cursor: pointer;
`;

export const ChoiseLeaguePage = styled.div`
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  height: auto;
`;

export const ChoiseLeagueOptions = styled.div`
  min-height: 60vh;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${colors.dark};
  color: ${colors.lightGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const OptionLeague = styled.button`
  width: 48%;
  height: 96%;
  text-decoration: none;
  border-radius: 0.5rem;
  color: ${colors.lightGray};
  transition: 0.4s ease 0s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.25rem solid ${colors.black};
  background-color: transparent;

  @media (max-width: 720px) {
    & {
      margin-top: 1rem;
      width: 92%;
    }
  }

  &:hover {
    background-color: ${colors.black};
    border-radius: 0.5rem;
  }
`;

export const OptionLeagueName = styled.h2`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 400;
  margin-bottom: 1.875rem;
  color: ${colors.lightGray};
`;

export const OptionImageLeague = styled.img`
  height: 10rem;
  margin-top: 4.625rem;
  margin-bottom: 4.625rem;

  @media (max-width: 720px) {
    & {
      height: 10rem;
    }
  }
`;

export const ChoiseTeamRegionPage = styled.div`
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  height: auto;
`;

export const ChoiseRegionOptions = styled.div`
  min-height: 55vh;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${colors.dark};
  color: ${colors.lightGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media (max-width: 720px) {
    & {
      flex-direction: column;
    }
  }
`;

export const OptionRegion = styled.button`
  width: 15vw;
  height: 21rem;
  text-decoration: none;
  border-radius: 0.5rem;
  color: ${colors.lightGray};
  transition: 0.4s ease 0s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.25rem solid ${colors.black};
  background-color: transparent;

  @media (max-width: 720px) {
    & {
      margin-bottom: 1rem;
      width: 90%;
    }
  }

  &:hover {
    background-color: ${colors.black};
    border-radius: 0.5rem;
  }
`;

export const OptionRegionName = styled.h2`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 400;
  margin-bottom: 1.875rem;
  color: ${colors.lightGray};
`;

export const OptionImageRegion = styled.img`
  width: 12rem;
  margin-top: 1.875rem;
`;

export const ChoiseTeamCountryPage = styled.div`
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  height: auto;
`;

export const ChoiseCountryOptions = styled.div`
  min-height: 57.5vh;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${colors.dark};
  color: ${colors.lightGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const OptionCountry = styled.button`
  width: 11rem;
  height: 22vh;
  text-decoration: none;
  border-radius: 0.5rem;
  color: ${colors.lightGray};
  transition: 0.4s ease 0s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.25rem solid ${colors.black};
  background-color: transparent;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${colors.black};
    border-radius: 0.5rem;
  }
`;

export const OptionCountryName = styled.h2`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 400;
  margin-bottom: 1.875rem;
  color: ${colors.lightGray};
`;

export const OptionImageCountry = styled.img`
  width: 5rem;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
`;

export const ChoiseTeamPage = styled.div`
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  height: auto;
`;

export const ChoiseOptions = styled.div`
  min-height: 57.5vh;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${colors.dark};
  color: ${colors.lightGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const Option = styled(Link)`
  width: 11rem;
  height: 22vh;
  text-decoration: none;
  border-radius: 0.5rem;
  color: ${colors.lightGray};
  transition: 0.4s ease 0s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.25rem solid ${colors.black};
  background-color: transparent;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${colors.black};
    border-radius: 0.5rem;
  }
`;

export const OptionName = styled.h2`
  font-size: 1.125rem;
  text-align: center;
  font-weight: 400;
  margin-bottom: 1.875rem;
  color: ${colors.lightGray};
`;

export const OptionImage = styled.img`
  width: 5rem;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
`;
