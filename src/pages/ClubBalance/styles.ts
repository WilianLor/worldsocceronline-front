import styled from "styled-components";
import colors from "../../styles/colors";

interface Props {
  theme: {
    color: string;
  };
}

export const Body = styled.div`
  flex: 1;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`;

export const ClubBalancePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 96vw;
  height: 35rem;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;

  @media (max-width: 720px) {
    height: auto;
  }
`;

export const ClubeBalanceMainContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;

  display: grid;
  grid-template-columns: 1fr 1.4fr 1.2fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ResumeContainer = styled.div`
  display: flex;
  grid-column: 1;
  background: ${colors.dark};
  border-radius: 0.5rem;
  flex-direction: column;

  @media (max-width: 720px) {
    width: 95%;
  }
`;

export const InfoContainers = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1rem;
  grid-column: 3;

  @media (max-width: 720px) {
    width: 95%;
  }
`;

export const MovementListsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-column: 2;

  @media (max-width: 720px) {
    width: 95%;
  }
`;

export const MovementsList = styled.div`
  background: ${colors.dark};
  box-size: border-box;
  border-radius: 0.5rem;
`;

export const Info = styled.div`
  background: ${colors.dark};
  box-size: border-box;
  border-radius: 0.5rem;

  @media (max-width: 720px) {
    height: 7rem;
  }
`;

export const InfoLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${colors.lightGray};
  margin-top: 1rem;
  margin-left: 1rem;
`;

export const ValueContainer = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Value = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props: Props) => props.theme.color};
`;

export const ResumeLedendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

export const LegendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-around;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LegendTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LegendColor = styled.span`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.35rem;
  border-radius: 0.125rem;
  background: ${(props: Props) => props.theme.color};
`;

export const LegendText = styled.h3`
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props: Props) => props.theme.color};
`;

export const LegendValue = styled.h3`
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props: Props) => props.theme.color};
`;

export const MovementsContainer = styled.div`
  margin: 0.5rem;
  width: 100% - 2rem;
  height: 9.1rem;
  border-radius: 0.325rem;

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
`;

export const Table = styled.table`
  width: 100%;
  margin-left: 6px;
`;

export const ContentLine = styled.tr`
  color: ${colors.lightGray};
`;

export const Content = styled.td`
  color: ${colors.lightGray};
`;
