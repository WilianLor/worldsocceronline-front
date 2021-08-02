import styled from "styled-components";

import { Link } from "react-router-dom";
import colors from "../../styles/colors";

export const Body = styled.div`
  flex: 1;
`;

export const TeamInfoPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96vw;
  height: 33rem;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;

  @media (max-width: 720px) {
    height: auto;
  }
`;

export const TeamInfoMainContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  grid-gap: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 314fr 457fr 371fr;

  @media (max-width: 720px) {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const InfosContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.dark};
  border-radius: 0.5rem;
  
  @media (max-width: 720px) {
    padding-top: 2rem;
    width: 100%;
    padding-bottom: 2rem;
    gap: 2rem;
  }
`;

export const SecondaryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 385fr 230fr;
  grid-gap: 1rem;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const PlayersListContainer = styled.div`
  flex: 1;
  background-color: ${colors.dark};
  border-radius: 0.5rem;
`;

export const ActionsContainer = styled.div`
  flex: 1;
  background-color: ${colors.dark};
  border-radius: 0.5rem;

  @media (max-width: 720px) {
    padding-bottom: 1rem;
  }
`;

export const TerciaryContainer = styled.div`
  display: grid;
  gri-template-columns: 1fr;
  grid-template-rows: 300fr 145fr 145fr;
  grid-gap: 1rem;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const CompetitionsContainer = styled.div`
  flex: 1;
  background-color: ${colors.dark};
  border-radius: 0.5rem;
`;

export const ProfessionContainer = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${colors.dark};
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-around;
  transition: 0.2s ease-in;
  border: 2px solid ${colors.dark};

  &:hover {
    border: 2px solid ${colors.green};
  }
`;

export const ProfessionTitleContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Legend = styled.h4`
  color: ${colors.green};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const Text = styled.h2`
  color: ${colors.lightGray};
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
`;

export const FlagImage = styled.img`
  height: 4rem;
`;

export const Competitions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
`;

export const Competition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-direction: row;
`;

export const CompetitionInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CompetitionImage = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  padding: 0.3rem;
  background-color: ${colors.black};
  border-radius: 0.5rem;
`;

export const ContainerTitle = styled.h2`
  color: ${colors.lightGray};
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-left: 1.5rem;
`;

export const TeamName = styled.h2`
  color: ${colors.lightGray};
  font-size: 1.3rem;
  font-weight: 500;
`

export const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

`

export const TeamImage = styled.img`
  width: 7rem;
  height: 7rem;
  padding: .3rem;
  background-color: ${colors.black};
  border-radius: 0.5rem;
`

export const TeamNameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: .5rem;
`

export const TeamFlag = styled.img`
  height: 2rem;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const InfoImage = styled.img`
  height: 4.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${colors.black}
`;

export const SponsorshipImage = styled.img`
  height: 4.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
`

export const InfoTexts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const InfoText = styled.h3`
  color: ${colors.lightGray};
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`

export const SmallText = styled.p`
  color: ${colors.lightGray};
  font-size: .9rem;
  font-weight: 400;
  word-break: break-all;
`

export const ActionsMainContent = styled.div`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  justify-content: space-around;
  margin-top: 1rem;
`

export const ButtonContainer = styled.div`
  width: 100% - 3rem;
  margin-top: -1rem;
`

export const InformationsConatiner = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const Table = styled.table`
  width: 100%;
`;

export const LineContent = styled.tr`
  color: ${colors.lightGray};
`;

export const Content = styled.td`
  color: ${colors.lightGray};
  text-align: center;
`;

export const HeaderLine = styled.tr`
  color: ${colors.green};
`

export const HeaderContent = styled.th`
  color: ${colors.green};
  font-weight: 500;
`

export const TableContainer = styled.div`
  width: 100%;
  height: 13rem;

  overflow-x: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar-track {
    background-color: ${colors.dark};
  }
  ::-webkit-scrollbar {
    width: 0.25rem;
    background: ${colors.lightGray};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.green};
    border-radius: 0.5rem;
  }
`