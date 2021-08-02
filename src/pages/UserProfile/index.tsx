import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import colors from "../../styles/colors";

import config from "../../config/api.json";
import axios, { AxiosResponse } from "axios";

import getInitialDate from "../../functions/getFormatedDate";
import LoadingComponent from "../../components/LoadingComponent";

import EditIcon from "@material-ui/icons/EditLocation";
import ConfirmIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import {
  TeamActive,
  ActiveContract,
  Body,
  InfoContainer,
  InfoName,
  Button,
  ProfilePage,
  Country,
  CountryImage,
  NameContainer,
  PlayerData,
  Subtitle,
  TeamImage,
  TeamName,
  Username,
  DescriptionContainer,
  DescriptionText,
  DescriptionButton,
  DescriptionEdit,
  ButtonsContainer,
  CarrerContainer,
  Career,
  Alert,
  Warning,
} from "./styles";

import Toast from "../../components/Toast";

import useData from "../../hooks/useData";

import { ProfessionData, params, career } from "./types";

import { useParams } from "react-router-dom";
import getFormatedDate from "../../functions/getFormatedDate";
import NumberToMoney from "../../functions/getFormatedMoney";

const UserProfile: React.FC = () => {
  const history = useHistory();
  const params = useParams<params>();

  const [editDescriptionMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [professionData, setProfessionData] = useState<ProfessionData>({
    profession: "",
    userId: "",
    username: "",
    description: "",
    countryImage: "",
    activeContract: {
      teamId: {
        _id: "",
        name: "",
        pictureUrl: "",
      },
      initialDate: "",
      salary: 0,
      seasonsDuration: 0,
      terminationFine: 0,
    },
    career: [],
  });

  const [description, setDescription] = useState(professionData.description);

  const { user } = useData();

  useEffect(() => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    const requestId = !params.id ? user.user.professionId : params.id;

    axios
      .get(config.baseUrl + "/getprofile/" + requestId, header)
      .then((response: AxiosResponse) => {
        setProfessionData(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alterDescription = () => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    const requestString =
      professionData.profession === "Coach"
        ? "/coach/editdescription"
        : "/president/editdescription";

    axios
      .post(config.baseUrl + requestString, { description }, header)
      .then((response: AxiosResponse) => {
        Toast("Descrição alterada com sucesso", true);
        setProfessionData({ ...professionData, description: description });
        setEditMode(false);
      })
      .catch(() => {
        Toast("Erro interno", false);
      });
  };

  const getFinalDate = () => {
    const initialDate = new Date(professionData.activeContract.initialDate);
    const finalDate = new Date(
      initialDate.setMonth(
        initialDate.getMonth() +
          professionData.activeContract.seasonsDuration * 3
      )
    ).getTime();
    const now = new Date().getTime();

    const aMonth = 1000 * 60 * 60 * 24 * 30;

    const diference = finalDate - now;

    const diferenceOfseasons = Math.round(diference / aMonth);

    return `${diferenceOfseasons} Meses`;
  };

  document.title = `WSO | ${professionData.username}`;
  document.body.style.background = colors.black;
  return (
    <Body>
      {loading ? (
        <LoadingComponent />
      ) : (
        <ProfilePage>
          {professionData.username !== "" ? (
            <>
              <PlayerData>
                <Country>
                  <CountryImage src={professionData.countryImage} />
                </Country>
                <NameContainer>
                  <Username>{professionData.username}</Username>
                  <Subtitle>
                    {professionData.profession === "Coach"
                      ? "T R E I N A D O R"
                      : "P R E S I D E N T E"}
                  </Subtitle>
                </NameContainer>
                <DescriptionContainer>
                  {user.user.userId === professionData.userId ? (
                    editDescriptionMode ? (
                      <>
                        <DescriptionEdit
                          defaultValue={professionData.description}
                          maxLength={200}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <ButtonsContainer>
                          <DescriptionButton onClick={() => alterDescription()}>
                            <ConfirmIcon
                              style={{ color: colors.lightGreen, fontSize: 37 }}
                            />
                          </DescriptionButton>
                          <DescriptionButton onClick={() => setEditMode(false)}>
                            <CancelIcon
                              style={{ color: colors.lightGreen, fontSize: 37 }}
                            />
                          </DescriptionButton>
                        </ButtonsContainer>
                      </>
                    ) : (
                      <>
                        <DescriptionText>
                          {professionData.description
                            ? professionData.description
                            : `Este ${
                                professionData.profession === "President"
                                  ? "presidente"
                                  : "treinador"
                              } ainda não possui uma descrição.`}
                        </DescriptionText>
                        <ButtonsContainer>
                          <DescriptionButton onClick={() => setEditMode(true)}>
                            <EditIcon
                              style={{ color: colors.lightGreen, fontSize: 40 }}
                            />
                          </DescriptionButton>
                        </ButtonsContainer>
                      </>
                    )
                  ) : professionData.description ? (
                    <DescriptionText>
                      {professionData.description}
                    </DescriptionText>
                  ) : (
                    <DescriptionText>
                      Este{" "}
                      {professionData.profession === "Coach"
                        ? "treinador"
                        : "presidente"}{" "}
                      ainda não possui uma descrição.
                    </DescriptionText>
                  )}
                </DescriptionContainer>
                {user.profession === "President" &&
                user.user.teamId !== "" &&
                user.user.teamId !== professionData.activeContract.teamId._id &&
                professionData.profession === "Coach" ? (
                  <Button
                    onClick={() => history.push("/coachtenders/" + params.id)}
                  >
                    ENVIAR PROPOSTA
                  </Button>
                ) : (
                  ""
                )}
              </PlayerData>
              <ActiveContract>
                {professionData.activeContract.initialDate !== "" ? (
                  <>
                    <TeamActive
                      src={professionData.activeContract.teamId.pictureUrl}
                    />
                    <TeamName>
                      {professionData.activeContract.teamId.name}
                    </TeamName>
                    <Subtitle>T I M E</Subtitle>
                    <InfoName>
                      {getFormatedDate(
                        professionData.activeContract.initialDate
                      )}
                    </InfoName>
                    <Subtitle>D A T A I N Í C I A L</Subtitle>
                    {professionData.profession === "Coach" ? (
                      <>
                        <InfoName>{getFinalDate()}</InfoName>
                        <Subtitle>R E S T A N T E S</Subtitle>
                        <InfoName>
                          R${" "}
                          {NumberToMoney(professionData.activeContract.salary)}
                        </InfoName>
                        <Subtitle>S A L Á R I O</Subtitle>
                        <InfoName>
                          R${" "}
                          {NumberToMoney(
                            professionData.activeContract.terminationFine
                          )}
                        </InfoName>
                        <Subtitle>M U L T A R E C I S Ó R I A</Subtitle>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <Alert>
                    <InfoName>
                      Este{" "}
                      {professionData.profession === "President"
                        ? "presidente"
                        : "treinador"}{" "}
                      ainda não está treinando um time.
                    </InfoName>
                  </Alert>
                )}
              </ActiveContract>
              <CarrerContainer>
                {professionData.career.length > 0 ? (
                  professionData.career.map((career: career, index) => (
                    <Career key={index}>
                      <TeamImage src={career.teamId.pictureUrl} />
                      <InfoContainer>
                        <InfoName>{career.teamId.name}</InfoName>
                        <Subtitle>T I M E</Subtitle>
                      </InfoContainer>
                      <InfoContainer>
                        <InfoName>
                          {getInitialDate(career.initialDate)}
                        </InfoName>
                        <Subtitle>D A T A I N Í C I A L</Subtitle>
                      </InfoContainer>
                      <InfoContainer>
                        <InfoName>{getInitialDate(career.finalDate)}</InfoName>
                        <Subtitle>D A T A F I N A L</Subtitle>
                      </InfoContainer>
                    </Career>
                  ))
                ) : (
                  <Alert>
                    <InfoName>
                      Este{" "}
                      {professionData.profession === "President"
                        ? "presidente"
                        : "treinador"}{" "}
                      ainda não possui um histórico.
                    </InfoName>
                  </Alert>
                )}
              </CarrerContainer>{" "}
            </>
          ) : (
            <Warning>
              <Alert>
                <InfoName>Este jogador não existe.</InfoName>
              </Alert>
            </Warning>
          )}
        </ProfilePage>
      )}
    </Body>
  );
};

export default UserProfile;
