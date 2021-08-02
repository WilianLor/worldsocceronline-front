import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import React from "react";

import { useParams } from "react-router";

import { Refresh } from "@material-ui/icons";
import { MenuItem } from "@material-ui/core";

import getFormatedDate from "../../functions/getFormatedDate";

import useData from "../../hooks/useData";

import config from "../../config/api.json";

import LoadingComponent from "../../components/LoadingComponent";
import Toast from "../../components/Toast";
import NumberToMoney from "../../functions/getFormatedMoney";

import {
  NegociationPage,
  Body,
  EditTextArea,
  EditInput,
  TendersContainer,
  TabContainer,
  Tab,
  SubTitle,
  Container,
  Title,
  Contract,
  ContractCoach,
  Button,
  List,
  Tender,
  ActionsButtons,
  Status,
  Name,
  ConditionsContainer,
  ContractPlan,
  Alert,
  TextAreaContainer,
} from "./styles";

import { editValues, params, tendersOption } from "./types";

import colors from "../../styles/colors";

const CoachTenders: React.FC = () => {
  const [tenders, setTenders] = useState<Array<tendersOption>>();
  const [activeTender, setActiveTender] = useState<tendersOption>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [editValues, setEditValues] = useState<editValues>();

  const [refresh, setRefresh] = useState(true);

  const { user, setUser } = useData();

  const params = useParams<params>();

  useEffect(() => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .get(config.baseUrl + "/getalltenders", header)
      .then((response: AxiosResponse) => {
        setTenders(response.data);
        if (activeTender !== undefined) {
          setActiveTender(
            response.data.find((tender: tendersOption) =>
              tender.tendersId.coachId._id ===
              activeTender?.tendersId.coachId._id
                ? tender
                : undefined
            )
          );
          setEditValues(undefined);
        }

        if (params.id && user.profession === "President") {
          const allTenders = response.data;

          axios
            .get(config.baseUrl + "/getcoach/" + params.id, header)
            .then((response: AxiosResponse) => {
              const paramCoach = {
                _id: response.data._id,
                tendersId: {
                  _id: response.data._id,
                  sender: "",
                  coachId: {
                    _id: response.data._id,
                    username: response.data.username,
                    teamId: response.data.teamId
                      ? response.data.teamId
                      : undefined,
                  },
                  teamId: undefined,
                  salary: 0,
                  date: "",
                  seasonsDuration: 0,
                  contractPlan: "",
                  terminationFine: 0,
                },
                method: "Creating",
              };

              let AlreadyHaveTender = false;

              const toggleHaveTender = (tender: tendersOption) => {
                AlreadyHaveTender = true;
                setActiveTender(tender);
              };

              allTenders.map((tender: tendersOption) =>
                tender.tendersId.coachId._id === params.id
                  ? toggleHaveTender(tender)
                  : ""
              );

              if (!AlreadyHaveTender) {
                setEditMode(true);
                setActiveTender(paramCoach);
              }
            });
        }
      });
    setLoading(false);
    // eslint-disable-next-line
  }, [refresh]);

  const sendAction = () => {
    if (activeTender?.method === "Creating") {
      const header = {
        headers: { authorization: "Bearer " + user.token },
      };

      axios
        .post(
          config.baseUrl + "/send/tenders/team",
          {
            coachId: activeTender.tendersId.coachId._id,
            seasonsDuration: editValues?.seasonsDuration,
            salary: editValues?.salary,
            contractPlan: editValues?.contractPlan,
            terminationFine: editValues?.terminationFine,
          },
          header
        )
        .then((response: AxiosResponse) => {
          if (response.status === 201) {
            setRefresh(!refresh);
            setEditMode(false);
            Toast("Proposta enviada com sucesso.", true);
          }
        });
    } else {
      const header = {
        headers: { authorization: "Bearer " + user.token },
      };

      const requestUrl = `${config.baseUrl}/counteroffer/tenders/${
        user.profession === "President" ? "team" : "coach"
      }/${activeTender?.tendersId._id}`;

      axios
        .post(
          requestUrl,
          {
            seasonsDuration: editValues?.seasonsDuration
              ? editValues?.seasonsDuration
              : activeTender?.tendersId.seasonsDuration,
            salary: editValues?.salary
              ? editValues?.salary
              : activeTender?.tendersId.salary,
            contractPlan: editValues?.contractPlan
              ? editValues?.contractPlan
              : activeTender?.tendersId.contractPlan,
            terminationFine: editValues?.terminationFine
              ? editValues?.terminationFine
              : activeTender?.tendersId.terminationFine,
          },
          header
        )
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            setRefresh(!refresh);
            setEditMode(false);
            Toast("Contra-proposta enviada com sucesso.", true);
          } else {
            console.log(response.data);
          }
        });
    }
  };

  const cancelTender = () => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    const requestUrl = `${config.baseUrl}/action/tender/${
      user.profession === "President" ? "team" : "coach"
    }/cancel/${activeTender?.tendersId._id}`;

    axios.post(requestUrl, {}, header).then((response: AxiosResponse) => {
      if (response.status === 200) {
        setRefresh(!refresh);
        setEditMode(false);
        Toast("Proposta cancelada com sucesso.", true);
      }
    });
  };

  const acceptTender = () => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    const requestUrl = `${config.baseUrl}/action/tender/${
      user.profession === "President" ? "team" : "coach"
    }/accept/${activeTender?.tendersId._id}`;

    axios.post(requestUrl, {}, header).then((response: AxiosResponse) => {
      if (response.status === 200) {
        setRefresh(!refresh);
        Toast("Parabéns, proposta aceita.", true);
        setEditMode(false);
        if(user.profession === "Coach") {
          let data = user
          if(activeTender && activeTender.tendersId.teamId) {
            data.user.teamId = activeTender.tendersId.teamId._id
          }
          setUser(data)
        }
      } else if (response.status === 202) {
        Toast(response.data.error, false);
      }
    });
  };

  const ButtonsContainer = (): JSX.Element => {
    return (
      <ActionsButtons>
        {activeTender ? (
          editMode ? (
            <>
              {editValues ? (
                <Button onClick={sendAction}>CONFIRMAR</Button>
              ) : (
                ""
              )}
              {activeTender.method === "Creating" ? (
                ""
              ) : (
                <Button onClick={() => setEditMode(false)}>CANCELAR</Button>
              )}
            </>
          ) : (
            <>
              {activeTender.method === "Send" ? (
                ""
              ) : (
                <>
                  <Button onClick={acceptTender}>ACEITAR</Button>
                  <Button onClick={() => setEditMode(true)}>
                    CONTRA-PROPOSTA
                  </Button>
                </>
              )}
              <Button onClick={cancelTender}>CANCELAR PROPOSTA</Button>{" "}
            </>
          )
        ) : (
          ""
        )}
      </ActionsButtons>
    );
  };

  document.body.style.backgroundColor = colors.black;
  document.title = "WSO | Negocições de treinadores";
  return (
    <Body>
      {loading ? (
        <LoadingComponent />
      ) : (
        <NegociationPage style={{ color: colors.lightGray }}>
          <TendersContainer>
            <TabContainer>
              <Tab>
                {user.profession === "President" ? "TREINADORES" : "TIMES"}
                <MenuItem
                  style={{
                    borderRadius: "50%",
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                >
                  <Refresh fill={colors.green} />
                </MenuItem>
              </Tab>
            </TabContainer>
            <List>
              {user.profession === "President"
                ? tenders?.map((tender: tendersOption) => (
                    <Tender
                      key={tender.tendersId.coachId._id}
                      id={
                        activeTender?.tendersId._id === tender.tendersId._id
                          ? "active"
                          : "disabled"
                      }
                      onClick={() => {
                        setActiveTender(tender);
                        setEditMode(false);
                        setEditValues(undefined);
                      }}
                    >
                      <Name>{tender.tendersId.coachId.username}</Name>
                      <Status
                        id={tender.method === "Send" ? "sended" : "received"}
                      >
                        {tender.method === "Send"
                          ? "ENVIADO"
                          : tender.method === "Creating"
                          ? "CRIANDO"
                          : "RESPONDER"}
                      </Status>
                    </Tender>
                  ))
                : tenders?.map((tender: tendersOption) => (
                    <Tender
                      key={tender.tendersId.coachId._id}
                      id={
                        activeTender?.tendersId._id === tender.tendersId._id
                          ? "active"
                          : "disabled"
                      }
                      onClick={() => {
                        setActiveTender(tender);
                        setEditMode(false);
                        setEditValues(undefined);
                      }}
                    >
                      <Name>{tender.tendersId.teamId?.name}</Name>
                      <Status
                        id={tender.method === "Send" ? "sended" : "received"}
                      >
                        {tender.method === "Send"
                          ? "ENVIADO"
                          : tender.method === "Creating"
                          ? "CRIANDO"
                          : "RESPONDER"}
                      </Status>
                    </Tender>
                  ))}
            </List>
          </TendersContainer>
          <ContractCoach>
            <Contract>
              {activeTender ? (
                editMode ? (
                  <>
                    <ConditionsContainer id="title">
                      <SubTitle id={"any"}>
                        VOCÊ PODE ALTERAR TODOS OS CAMPOS DO CONTRATO
                      </SubTitle>
                      <SubTitle>
                        {activeTender.method === "Send"
                          ? "ENVIADO"
                          : activeTender.method === "Creating"
                          ? "CRIANDO"
                          : "RESPONDER"}
                      </SubTitle>
                    </ConditionsContainer>
                    <ConditionsContainer>
                      <Container>
                        <SubTitle>
                          {user.profession === "President"
                            ? "T R E I N A D O R"
                            : "T I M E"}
                        </SubTitle>
                        <Title>
                          {user.profession === "President"
                            ? activeTender.tendersId.coachId.username
                            : activeTender.tendersId.teamId?.name}
                        </Title>
                      </Container>
                      <Container>
                        <SubTitle>M U L T A R E C I S Ó R I A</SubTitle>
                        <EditInput
                          defaultValue={
                            activeTender.tendersId.terminationFine === 0
                              ? ""
                              : activeTender.tendersId.terminationFine
                          }
                          type="number"
                          placeholder="Multa recisória"
                          onChange={(e) =>
                            setEditValues({
                              salary: editValues?.salary,
                              seasonsDuration: editValues?.seasonsDuration,
                              contractPlan: editValues?.contractPlan,
                              terminationFine: parseInt(e.target.value),
                            })
                          }
                        />
                      </Container>
                    </ConditionsContainer>
                    <ConditionsContainer>
                      <Container>
                        <SubTitle>D U R A Ç Ã O</SubTitle>
                        <EditInput
                          defaultValue={
                            activeTender.tendersId.seasonsDuration === 0
                              ? ""
                              : activeTender.tendersId.seasonsDuration
                          }
                          type="number"
                          placeholder="Temporadas"
                          onChange={(e) =>
                            setEditValues({
                              salary: editValues?.salary,
                              seasonsDuration: parseInt(e.target.value),
                              contractPlan: editValues?.contractPlan,
                              terminationFine: editValues?.terminationFine,
                            })
                          }
                        />
                      </Container>
                      <Container>
                        <SubTitle>S A L Á R I O</SubTitle>
                        <EditInput
                          defaultValue={
                            activeTender.tendersId.salary === 0
                              ? ""
                              : activeTender.tendersId.salary
                          }
                          type="number"
                          placeholder="Digite o salário"
                          onChange={(e) =>
                            setEditValues({
                              salary: parseInt(e.target.value),
                              seasonsDuration: editValues?.seasonsDuration,
                              contractPlan: editValues?.contractPlan,
                              terminationFine: editValues?.terminationFine,
                            })
                          }
                        />
                      </Container>
                    </ConditionsContainer>
                    <TextAreaContainer>
                      <SubTitle>P L A N O D E C O N T R A T O</SubTitle>
                      <EditTextArea
                        defaultValue={activeTender.tendersId.contractPlan}
                        placeholder="Digite as metas de contrato"
                        onChange={(e) =>
                          setEditValues({
                            salary: editValues?.salary,
                            seasonsDuration: editValues?.seasonsDuration,
                            contractPlan: e.target.value,
                            terminationFine: editValues?.terminationFine,
                          })
                        }
                      />
                    </TextAreaContainer>
                  </>
                ) : (
                  <>
                    <ConditionsContainer id="title">
                      <Container>
                        <SubTitle id={"any"}>
                          VOCÊ PODE ALTERAR TODOS OS CAMPOS DO CONTRATO
                        </SubTitle>
                        <SubTitle>
                          {activeTender.method === "Send"
                            ? "ENVIADO"
                            : activeTender.method === "Creating"
                            ? "CRIANDO"
                            : "RESPONDER"}
                        </SubTitle>
                        <SubTitle>
                          {getFormatedDate(activeTender.tendersId.date)}
                        </SubTitle>
                      </Container>
                    </ConditionsContainer>
                    <ConditionsContainer>
                      <Container>
                        <SubTitle>
                          {user.profession === "President"
                            ? "T R E I N A D O R"
                            : "T I M E"}
                        </SubTitle>
                        <Title>
                          {user.profession === "President"
                            ? activeTender.tendersId.coachId.username
                            : activeTender.tendersId.teamId?.name}
                        </Title>
                      </Container>
                      <Container>
                        <SubTitle>M U L T A R E C I S Ó R I A</SubTitle>
                        <Title>
                          R${" "}
                          {NumberToMoney(
                            activeTender.tendersId.terminationFine
                          )}
                        </Title>
                      </Container>
                    </ConditionsContainer>
                    <ConditionsContainer>
                      <Container>
                        <SubTitle>D U R A Ç Ã O</SubTitle>
                        <Title>
                          {activeTender.tendersId.seasonsDuration} Temporadas
                        </Title>
                      </Container>
                      <Container>
                        <SubTitle>S A L Á R I O</SubTitle>
                        <Title>
                          R$ {NumberToMoney(activeTender.tendersId.salary)}
                        </Title>
                      </Container>
                    </ConditionsContainer>
                    <Container>
                      <SubTitle>P L A N O D E C O N T R A T O</SubTitle>
                      <ContractPlan>
                        {activeTender.tendersId.contractPlan}
                      </ContractPlan>
                    </Container>
                  </>
                )
              ) : (
                <Alert>SELECIONE UMA PROPOSTA À ESQUERDA.</Alert>
              )}
            </Contract>
            <ActionsButtons>{ButtonsContainer()}</ActionsButtons>
          </ContractCoach>
        </NegociationPage>
      )}
    </Body>
  );
};

export default CoachTenders;
