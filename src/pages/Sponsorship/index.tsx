import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../../config/api.json";
import colors from "../../styles/colors";

import LoadingComponent from "../../components/LoadingComponent";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Toast from "../../components/Toast";

import NumberToMoney from "../../functions/getFormatedMoney";

import useData from "../../hooks/useData";

import {
  SponsorshipPage,
  Body,
  SponsorshipMainContent,
  SponsorshipOption,
  SponsorshipImage,
  SponsorshipName,
  NameContainer,
  Subtitle,
  DescriptionText,
  HighlightText,
} from "./styles";
import { ResponseData, SponsorshipType } from "./types";

const Sponsorship: React.FC = () => {
  document.title = "WSO | Início";
  document.body.style.background = colors.black;

  const [loading, setLoading] = useState(true);
  const [sponsorships, setSponsorships] = useState<ResponseData>();
  const [sponsorship, setSponsorship] = useState<SponsorshipType>() 

  const { user } = useData();

  useEffect(() => {
    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios.get(config.baseUrl + "/getsponsorships", header).then((response) => {
      if (response.status === 200) {
        setSponsorships(response.data);

        if(response.data.haveSponsorship) {
          setSponsorship(response.data.sponsorships)
        }

        setLoading(false);
      }
    });
  }, [user]);

  const selectSponsorship = (id: string, name: string) => {
    const data = {
      sponsorshipId: id,
    };

    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .post(config.baseUrl +"/selectsponsorship", data, header)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          Toast(
            `Agora o seu time possui a marca ${name} como patrocinador.`,
            true
          );

          const sponsorship = sponsorships?.sponsorships.find(
            (sponsorship) => sponsorship._id
          );

          if (sponsorship) {
            setSponsorships({
              haveSponsorship: true,
              sponsorships: [sponsorship],
            });
          }
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <Body>
      {loading ? (
        <LoadingComponent />
      ) : (
        <SponsorshipPage>
          <Header
            title="Patrocinadores"
            text={`Existem 2 tipos de patrocinadores, os ganhos podem ser baseados na
              presença de torcida ou referente a posição do clube no campeonato
              nacional. ${
                sponsorships?.haveSponsorship === false
                  ? "Escolha uma das opções de patrocinadores abaixo."
                  : ""
              }`}
          />
          <SponsorshipMainContent>
            {sponsorships?.haveSponsorship === false
              ? sponsorships.sponsorships.map((sponsorship, index) => (
                  <SponsorshipOption key={index} className="option">
                    <SponsorshipImage src={sponsorship.pictureUrl} />
                    <NameContainer>
                      <SponsorshipName>{sponsorship.name}</SponsorshipName>
                      <Subtitle>P A T R O C Í N I O</Subtitle>
                    </NameContainer>
                    {sponsorship.type === "ticket" ? (
                      <DescriptionText>
                        Este patrocínio é referente a quantidade de torcedores
                        presentes no estádio, ou seja, ele proporciona um a
                        parte ganho{" "}
                        <HighlightText>{sponsorship.value}%</HighlightText>{" "}
                        maior do que a renda de bilheteria.
                      </DescriptionText>
                    ) : (
                      <DescriptionText>
                        Este patrocínio é referente a sua posição atual no
                        campeonato nacional, ou seja, se você for o primeiro
                        colocado ganhará um total de{" "}
                        <HighlightText>
                          R$ {NumberToMoney(sponsorship.value)} x 20.
                        </HighlightText>
                      </DescriptionText>
                    )}
                    <Button title="ESCOLHER" onClick={() => selectSponsorship(sponsorship._id, sponsorship.name)}/>
                  </SponsorshipOption>
                ))
              : 
              <SponsorshipOption>
              <SponsorshipImage src={sponsorship?.pictureUrl} />
              <NameContainer>
                <SponsorshipName>{sponsorship?.name}</SponsorshipName>
                <Subtitle>P A T R O C Í N I O</Subtitle>
              </NameContainer>
              {sponsorship?.type === "ticket" ? (
                <DescriptionText>
                  Este patrocínio é referente a quantidade de torcedores
                  presentes no estádio, ou seja, ele proporciona um a
                  parte ganho{" "}
                  <HighlightText>{sponsorship?.value}%</HighlightText>{" "}
                  maior do que a renda de bilheteria.
                </DescriptionText>
              ) : (
                <DescriptionText>
                  Este patrocínio é referente a sua posição atual no
                  campeonato nacional, ou seja, se você for o primeiro
                  colocado ganhará um total de{" "}
                  <HighlightText>
                    R$ {NumberToMoney(sponsorship ? sponsorship?.value : 0)} x 20.
                  </HighlightText>
                </DescriptionText>
              )}
              <NameContainer>
                <DescriptionText>Este patrocínio é válido até o fim da temporada.</DescriptionText>
                <Subtitle>C O N T R A T O</Subtitle>
              </NameContainer>
            </SponsorshipOption>
              }
          </SponsorshipMainContent>
        </SponsorshipPage>
      )}
    </Body>
  );
};

export default Sponsorship;
