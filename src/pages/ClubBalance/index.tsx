import React from "react";
import {
  Body,
  ClubBalancePage,
  ClubeBalanceMainContent,
  InfoContainers,
  ResumeContainer,
  MovementListsContainer,
  Info,
  MovementsList,
  InfoLabel,
  ChartContainer,
  ValueContainer,
  Value,
  Legend,
  LegendColor,
  LegendContainer,
  LegendText,
  LegendTitleContainer,
  LegendValue,
  ResumeLedendContainer,
  MovementsContainer,
  ContentLine,
  Content,
  Table,
} from "./styles";

import Header from "../../components/Header";

import { BarChart, Bar } from "recharts";

import colors from "../../styles/colors";
import NumberToMoney from "../../functions/getFormatedMoney";

const ClubBalance: React.FC = () => {
  document.body.style.backgroundColor = colors.black;
  document.title = "WSO | Balanço do clube";

  const data = [
    {
      income: 1545000,
      outcome: 240000,
    },
  ];

  return (
    <Body>
      <ClubBalancePage>
        <Header title="Balanço do clube na atual temporada." text="Gerencie a cituação financeira do clube, tome cuidado, se a coisa
            ficar feia, você podera ser demitido." />
        <ClubeBalanceMainContent>
          <ResumeContainer>
            <InfoLabel>Saldo Total</InfoLabel>
            <ResumeLedendContainer>
              <Value theme={{ color: colors.lightGray }}>
                R$ {NumberToMoney(data[0].income - data[0].outcome)}
              </Value>
              <LegendContainer>
                <Legend>
                  <LegendTitleContainer>
                    <LegendColor theme={{ color: colors.green }} />
                    <LegendText theme={{ color: colors.green }}>
                      Entradas
                    </LegendText>
                  </LegendTitleContainer>
                  <LegendValue theme={{ color: colors.green }}>
                    {" "}
                    R$ {NumberToMoney(data[0].income)}
                  </LegendValue>
                </Legend>
                <Legend>
                  <LegendTitleContainer>
                    <LegendColor theme={{ color: colors.red }} />
                    <LegendText theme={{ color: colors.red }}>
                      Saídas
                    </LegendText>
                  </LegendTitleContainer>
                  <LegendValue theme={{ color: colors.red }}>
                    R$ {NumberToMoney(data[0].outcome)}
                  </LegendValue>
                </Legend>
              </LegendContainer>
            </ResumeLedendContainer>
            <ChartContainer>
              <BarChart width={200} height={220} data={data}>
                <Bar
                  dataKey="income"
                  fill={colors.green}
                  radius={5}
                  style={{ marginTop: 20 }}
                />
                <Bar dataKey="outcome" fill={colors.red} radius={5} />
              </BarChart>
            </ChartContainer>
          </ResumeContainer>
          <MovementListsContainer>
            <MovementsList>
              <InfoLabel>Ultimos gastos</InfoLabel>
              <MovementsContainer>
                <Table>
                  <tbody>
                    <ContentLine>
                      <Content>R$ {NumberToMoney(10000)}</Content>
                      <Content>Venda do jogador B. Mendez</Content>
                      <Content>17/09</Content>
                    </ContentLine>
                  </tbody>
                </Table>
              </MovementsContainer>
            </MovementsList>
            <MovementsList>
              <InfoLabel>Ultimas receitas</InfoLabel>
              <MovementsContainer>
                <Table>
                  <tbody>
                    <ContentLine>
                      <Content>R$ {NumberToMoney(10000)}</Content>
                      <Content>Venda do jogador B. Mendez</Content>
                      <Content>17/09</Content>
                    </ContentLine>
                  </tbody>
                </Table>
              </MovementsContainer>
            </MovementsList>
          </MovementListsContainer>
          <InfoContainers>
            <Info>
              <InfoLabel>Renda de bilheteria / Próxima rodada</InfoLabel>
              <ValueContainer>
                <Value theme={{ color: colors.green }}>
                  R$ {NumberToMoney(1524200)}
                </Value>
              </ValueContainer>
            </Info>
            <Info>
              <InfoLabel>Renda de patrocínio / Próxima rodada</InfoLabel>
              <ValueContainer>
                <Value theme={{ color: colors.green }}>
                  R$ {NumberToMoney(5524200)}
                </Value>
              </ValueContainer>
            </Info>
            <Info>
              <InfoLabel>Folha salárial / Próximo mês</InfoLabel>
              <ValueContainer>
                <Value theme={{ color: colors.red }}>
                  R$ {NumberToMoney(11524200)}
                </Value>
              </ValueContainer>
            </Info>
          </InfoContainers>
        </ClubeBalanceMainContent>
      </ClubBalancePage>
    </Body>
  );
};

export default ClubBalance;
