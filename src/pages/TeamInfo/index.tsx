import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../../config/api.json";
import { useParams, useHistory } from "react-router-dom";

import Stadium from "../../images/stadium01.png";
import LoadingComponent from "../../components/LoadingComponent";
import { interest, RouteParams, TeamInfoType } from "./types";
import {
  Body,
  TeamInfoPage,
  TeamInfoMainContent,
  ActionsContainer,
  CompetitionsContainer,
  InfosContainer,
  PlayersListContainer,
  ProfessionContainer,
  SecondaryContainer,
  TerciaryContainer,
  FlagImage,
  Legend,
  Text,
  ProfessionTitleContainer,
  Competition,
  CompetitionImage,
  CompetitionInfos,
  Competitions,
  ContainerTitle,
  InfoContainer,
  InfoImage,
  InfoTexts,
  TeamContainer,
  TeamFlag,
  TeamImage,
  TeamNameContainer,
  TeamName,
  InfoText,
  ActionsMainContent,
  SmallText,
  ButtonContainer,
  InformationsConatiner,
  Content,
  HeaderContent,
  HeaderLine,
  LineContent,
  Table,
  TableContainer,
  SponsorshipImage
} from "./styles";

import Button from "../../components/Button";

import colors from "../../styles/colors";
import Toast from "../../components/Toast";

import useData from "../../hooks/useData";

import getPosition from "../../functions/getPosition";
import NumberToMoney from "../../functions/getFormatedMoney";

const TeamInfo: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<TeamInfoType>();
  const [interestedCoaches, setInterestedCoaches] = useState<Array<interest>>(
    []
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const { id } = useParams<RouteParams>();

  const { user, setUser } = useData();

  useEffect(() => {
    if (id) {
      axios.get(config.baseUrl + `/teaminfo/${id}`).then((response) => {
        if (response.status === 200) {
          setInterestedCoaches(response.data.teamData.interestedCoaches);
          setTeamInfo(response.data.teamData);
          setLoading(false);
        }
      });
    }
  }, [id]);

  const showInterest = () => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .post(config.baseUrl + "/showinterest", { teamId: teamInfo?._id }, header)
      .then((response: AxiosResponse) => {
        setInterestedCoaches([{ _id: "id", coachId: user.user.professionId }]);
        Toast("Interesse demonstrado.", true);
      })
      .catch((e) => {
        Toast("Erro interno.", false);
      });
  };

  const removeInterest = () => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .post(
        config.baseUrl + "/removeinterest",
        { teamId: teamInfo?._id },
        header
      )
      .then((response: AxiosResponse) => {
        setInterestedCoaches([]);
        Toast("Interesse removido com sucesso.", true);
      })
      .catch((e) => {
        Toast("Erro interno.", false);
      });
  };

  const joinTeam = () => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .post(
        config.baseUrl + "/jointeam/president",
        { TeamId: teamInfo?._id },
        header
      )
      .then((response: AxiosResponse) => {
        Toast(
          "Parabéns, agora você é presidente do " + TeamInfo.name + ".",
          true
        );
        
        if(teamInfo) {
          let data = user
          data.user.teamId = teamInfo._id
          setUser(data)
        }

        history.push("/home");
      })
      .catch((e) => {
        Toast("Erro interno.", false);
        console.log("erro" + e);
      });
  };

  const getTeamValue = () => {
    let totalValue = 0;

    teamInfo?.players.forEach((player) => {
      totalValue += player.transferAmount;
    });

    return NumberToMoney(totalValue);
  };

  const ActionButton: React.FC = () => {
    if (user.profession === "Coach") {
      if (user.user.teamId === teamInfo?._id) {
        return <> </>;
      } else {
        let isInterested = false;
        interestedCoaches.map((interest: interest) =>
          interest.coachId === user.user.professionId
            ? (isInterested = true)
            : ""
        );

        if (isInterested) {
          return <Button onClick={removeInterest} title="REMOVER INTERESSE" />;
        } else {
          return <Button onClick={showInterest} title="DEMONSTRAR INTERESSE" />;
        }
      }
    } else {
      if (user.user.teamId === teamInfo?._id) {
        return <> </>;
      } else {
        if (teamInfo?.president.name !== "") {
          return <> </>;
        }
        return <Button onClick={joinTeam} title="INICIAR MANDATO" />;
      }
    }
  };

  document.body.style.backgroundColor = colors.black;
  document.title = `WSO | ${teamInfo?.name}`;
  return (
    <Body>
      {loading ? (
        <LoadingComponent />
      ) : (
        <TeamInfoPage>
          <TeamInfoMainContent>
            <InfosContainer>
              <TeamContainer>
                <TeamImage src={teamInfo?.pictureUrl} />
                <TeamNameContainer>
                  <TeamName>{teamInfo?.name}</TeamName>
                  <TeamFlag src={teamInfo?.countryPictureUrl} />
                </TeamNameContainer>
              </TeamContainer>
              <InfoContainer>
                <InfoImage src={Stadium} />
                <InfoTexts>
                  <InfoText>{teamInfo?.stadium.name}</InfoText>
                  <InfoText>
                    {teamInfo
                      ? teamInfo.stadium.capacityLevel * 5 + " Mil assentos"
                      : ""}
                  </InfoText>
                  <Legend>E S T Á D I O</Legend>
                </InfoTexts>
              </InfoContainer>
              <InfoContainer>
                {teamInfo?.sponsorship.pictureUrl !== "" ? (
                  <SponsorshipImage src={teamInfo?.sponsorship.pictureUrl} />
                ) : (
                  ""
                )}
                <InfoTexts>
                  <InfoText>
                    {teamInfo?.sponsorship.name !== ""
                      ? teamInfo?.sponsorship.name
                      : "Não possui um patrocínio"}
                  </InfoText>
                  <Legend>P A T R O C Í N I O</Legend>
                </InfoTexts>
              </InfoContainer>
            </InfosContainer>
            <SecondaryContainer>
              <PlayersListContainer>
                <ContainerTitle>Plantel da equipe</ContainerTitle>
                <InformationsConatiner>
                  <SmallText>{teamInfo?.players.length} Jogadores</SmallText>
                  <SmallText>Valor de elenco: R$ {getTeamValue()}</SmallText>
                </InformationsConatiner>
                <TableContainer>
                  {teamInfo && teamInfo.players.length > 0 ? (
                    <Table>
                      <thead>
                        <HeaderLine>
                          <HeaderContent>NOME</HeaderContent>
                          <HeaderContent>IDD</HeaderContent>
                          <HeaderContent>POS</HeaderContent>
                          <HeaderContent>OVR</HeaderContent>
                          <HeaderContent>VAL</HeaderContent>
                        </HeaderLine>
                      </thead>
                      <tbody>
                        {teamInfo
                          ? teamInfo.players.map((player, index) => (
                              <LineContent key={index}>
                                <Content>
                                  {player.firstName} {player.lastName}
                                </Content>
                                <Content>{player.age}</Content>
                                <Content>
                                  {getPosition(player.position)}
                                </Content>
                                <Content>{player.overall}</Content>
                                <Content>
                                  R$ {NumberToMoney(player.transferAmount)}
                                </Content>
                              </LineContent>
                            ))
                          : ""}
                      </tbody>
                    </Table>
                  ) : (
                    <Text>Esta equipe ainda não possui nenhum jogador</Text>
                  )}
                </TableContainer>
              </PlayersListContainer>
              <ActionsContainer>
                <ContainerTitle>Ações</ContainerTitle>
                <ActionsMainContent>
                  <SmallText>
                    Número de treinadores interessados{" "}
                    {interestedCoaches.length}
                  </SmallText>
                  <SmallText>
                    {user.profession === "Coach"
                      ? user.user.teamId === teamInfo?._id
                        ? "Você ja é treinador desta equipe."
                        : "Demontre interesse em treinar este clube, o presidente do clube consegue buscar os os interessados para começar uma negociação."
                      : user.user.teamId === teamInfo?._id
                      ? "Você ja é presidente desta equipe."
                      : teamInfo?.president._id !== ""
                      ? "A equipe ja possui um presidente, procure outra ou torça para que o presidente se dê mal."
                      : "Se a equipe ainda não possuir um treinador você pode assumir a direção, seja rápido antes que alguém assuma primeiro."}
                  </SmallText>
                  <ButtonContainer>
                    <ActionButton />
                  </ButtonContainer>
                </ActionsMainContent>
              </ActionsContainer>
            </SecondaryContainer>
            <TerciaryContainer>
              <CompetitionsContainer>
                <ContainerTitle>Competições atuais</ContainerTitle>
                <CompetitionsContainer>
                  <Competitions>
                    <Competition>
                      {teamInfo?.nacionalCompetition._id ? (
                        <CompetitionImage
                          src={teamInfo?.nacionalCompetition.pictureUrl}
                        />
                      ) : (
                        ""
                      )}
                      <CompetitionInfos>
                        {teamInfo?.nacionalCompetition._id ? (
                          <Text>{teamInfo?.nacionalCompetition.name}</Text>
                        ) : (
                          <Text>Não está participando</Text>
                        )}
                        <Legend>N A C I O N A L</Legend>
                      </CompetitionInfos>
                    </Competition>
                    <Competition>
                      {teamInfo?.regionalCompetition._id ? (
                        <CompetitionImage
                          src={teamInfo?.regionalCompetition.pictureUrl}
                        />
                      ) : (
                        ""
                      )}
                      <CompetitionInfos>
                        {teamInfo?.regionalCompetition._id ? (
                          <Text>{teamInfo?.regionalCompetition.name}</Text>
                        ) : (
                          <Text>Não está participando</Text>
                        )}
                        <Legend>R E G I O N A L</Legend>
                      </CompetitionInfos>
                    </Competition>
                  </Competitions>
                </CompetitionsContainer>
              </CompetitionsContainer>
              <ProfessionContainer
                to={
                  teamInfo?.president._id !== "" && teamInfo
                    ? "/userprofile/" + teamInfo.president._id
                    : "#"
                }
              >
                {teamInfo?.president._id !== "" ? (
                  <>
                    <ProfessionTitleContainer>
                      <Text>{teamInfo?.president.name}</Text>
                      <Legend>P R E S I D E N T E</Legend>
                    </ProfessionTitleContainer>

                    <FlagImage src={teamInfo?.president.countryPictureUrl} />
                  </>
                ) : (
                  <Text>Ainda não possui um presidente</Text>
                )}
              </ProfessionContainer>
              <ProfessionContainer
                to={
                  teamInfo?.coach._id !== "" && teamInfo
                    ? "/userprofile/" + teamInfo.coach._id
                    : "#"
                }
              >
                {teamInfo?.coach._id !== "" ? (
                  <>
                    <ProfessionTitleContainer>
                      <Text>{teamInfo?.coach.name}</Text>
                      <Legend>T R E I N A D O R</Legend>
                    </ProfessionTitleContainer>

                    <FlagImage src={teamInfo?.coach.countryPictureUrl} />
                  </>
                ) : (
                  <Text>Ainda não possui um treinador</Text>
                )}
              </ProfessionContainer>
            </TerciaryContainer>
          </TeamInfoMainContent>
        </TeamInfoPage>
      )}
    </Body>
  );
};

export default TeamInfo;
