import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import config from "../../config/api.json";

import Header from "../../components/Header";

import Asia from "../../images/asia.svg";
import SouthAmerica from "../../images/southamerica.svg";
import NorthAmerica from "../../images/northamerica.svg";
import Africa from "../../images/africa.svg";
import Europa from "../../images/europe.svg";
import Oceania from "../../images/oceania.svg";
import {
  Body,
  Option,
  ButtonGoBack,
  ChoiseCountryOptions,
  ChoiseLeagueOptions,
  ChoiseLeaguePage,
  ChoiseOptions,
  ChoiseRegionOptions,
  ChoiseTeamCountryPage,
  ChoiseTeamPage,
  ChoiseTeamRegionPage,
  ErrorOption,
  GoBackContent,
  OptionCountry,
  OptionCountryName,
  OptionImage,
  OptionImageCountry,
  OptionImageLeague,
  OptionImageRegion,
  OptionLeague,
  OptionLeagueName,
  OptionName,
  OptionRegion,
  OptionRegionName,
} from "./styles";

import LoadingComponent from "../../components/LoadingComponent";
import colors from "../../styles/colors";

import { country, league, region, team } from "./types";

const FindTeam: React.FC = () => {
  const [activePage, setActivePage] = useState("Region");
  const [Region, setRegion] = useState({ _id: "", name: "" });
  const [Country, setCountry] = useState({ _id: "", name: "" });
  const [League, setLeague] = useState({ _id: "", name: "" });

  const [Regions, setRegions] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [Leagues, setLeagues] = useState([]);
  const [Teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Regions.length < 1) {
      axios
        .get(config.baseUrl + "/getregions")
        .then((response: AxiosResponse) => {
          setRegions(response.data.Regions);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Regions]);

  const selectRegion = (region: { _id: string; name: string }) => {
    setRegion(region);

    axios
      .get(config.baseUrl + "/regioncountries/" + region._id)
      .then((response: AxiosResponse) => {
        setCountries(response.data.countries);
        setActivePage("Country");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectCountry = (country: { _id: string; name: string }) => {
    setCountry(country);

    axios
      .get(config.baseUrl + "/countryleagues/" + country._id)
      .then((response: AxiosResponse) => {
        setLeagues(response.data.leagues);
        setActivePage("League");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectLeague = (league: { _id: string; name: string }) => {
    setLeague(league);

    axios
      .get(config.baseUrl + "/leagueteams/" + league._id)
      .then((response: AxiosResponse) => {
        setTeams(response.data.teams);
        setActivePage("Team");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RegionComponent: React.FC = () => {
    return (
      <ChoiseTeamRegionPage>
        <Header
          title="Escolha a regi??o do time."
          text="Cada regi??o tem uma competi????o principal e uma secund??ria, onde
            todos os times dos paises que pertencem dessa regi??o brigam por
            vagas nessas competi??oes em suas ligas nacionais."
        />
        <ChoiseRegionOptions>
          {Regions.map((region: region) => (
            <OptionRegion
              key={region._id}
              onClick={() =>
                selectRegion({ _id: region._id, name: region.name })
              }
            >
              <OptionImageRegion
                src={
                  region.name === "Am??rica do Sul"
                    ? SouthAmerica
                    : region.name === "Am??rica do Norte"
                    ? NorthAmerica
                    : region.name === "Europa"
                    ? Europa
                    : region.name === "??frica"
                    ? Africa
                    : region.name === "Oce??nia"
                    ? Oceania
                    : region.name === "??sia"
                    ? Asia
                    : ""
                }
              />
              <OptionRegionName>{region.name}</OptionRegionName>
            </OptionRegion>
          ))}
        </ChoiseRegionOptions>
      </ChoiseTeamRegionPage>
    );
  };

  const CountryComponent: React.FC = () => {
    return (
      <ChoiseTeamCountryPage>
        <Header
          title="Agora escolha o pais do time."
          text="Cada Pais tem uma competi????o principal e uma secund??ria, onde todos
            os times dos paises que participam da secund??ria podem subir para a
            principal na pr??xima temporada."
        >
          <GoBackContent>
            <ButtonGoBack
              onClick={() => {
                setCountry({ _id: "", name: "" });
                setActivePage("Region");
              }}
            >
              {Region.name}
            </ButtonGoBack>
          </GoBackContent>
        </Header>
        <ChoiseCountryOptions>
          {Countries.length > 0 ? (
            Countries.map((country: country) => (
              <OptionCountry
                key={country._id}
                onClick={() =>
                  selectCountry({ _id: country._id, name: country.name })
                }
              >
                <OptionImageCountry src={country.pictureUrl} />
                <OptionCountryName>{country.name}</OptionCountryName>
              </OptionCountry>
            ))
          ) : (
            <ErrorOption>
              Ops... Esta Regi??o ainda n??o possui paises.
            </ErrorOption>
          )}
        </ChoiseCountryOptions>
      </ChoiseTeamCountryPage>
    );
  };

  const LeagueComponent: React.FC = () => {
    return (
      <ChoiseLeaguePage>
        <Header
          title="Agora escolha a liga do time."
          text="Cada liga possui 20 times, os times que jogam na liga principal
            podem se classificar para as competi????es regionais."
        >
          <GoBackContent>
            <ButtonGoBack
              onClick={() => {
                setCountry({ _id: "", name: "" });
                setRegion({ _id: "", name: "" });
                setActivePage("Region");
              }}
            >
              {Region.name}
            </ButtonGoBack>
            <ButtonGoBack
              onClick={() => {
                setCountry({ _id: "", name: "" });
                setActivePage("Country");
              }}
            >
              {Country.name}
            </ButtonGoBack>
          </GoBackContent>
        </Header>
        <ChoiseLeagueOptions>
          {Leagues.length > 0 ? (
            Leagues.map((league: league) => (
              <OptionLeague
                key={league._id}
                onClick={() =>
                  selectLeague({ _id: league._id, name: league.name })
                }
              >
                <OptionImageLeague src={league.pictureUrl} />
                <OptionLeagueName>{league.name}</OptionLeagueName>
              </OptionLeague>
            ))
          ) : (
            <ErrorOption>
              Ops... Este pais ainda n??o possui competi????es.
            </ErrorOption>
          )}
        </ChoiseLeagueOptions>
      </ChoiseLeaguePage>
    );
  };

  const TeamComponent: React.FC = () => {
    return (
      <ChoiseTeamPage>
        <Header
          title="Agora escolha o time."
          text="Cada time possui or??amentos diferentes, jogadores diferentes, e
            preten????es diferentes."
        >
          <GoBackContent>
            <ButtonGoBack
              onClick={() => {
                setLeague({ _id: "", name: "" });
                setCountry({ _id: "", name: "" });
                setRegion({ _id: "", name: "" });
                setActivePage("Region");
              }}
            >
              {Region.name}
            </ButtonGoBack>
            <ButtonGoBack
              onClick={() => {
                setLeague({ _id: "", name: "" });
                setCountry({ _id: "", name: "" });
                setActivePage("Country");
              }}
            >
              {Country.name}
            </ButtonGoBack>
            <ButtonGoBack
              onClick={() => {
                setLeague({ _id: "", name: "" });
                setActivePage("League");
              }}
            >
              {League.name}
            </ButtonGoBack>
          </GoBackContent>
        </Header>
        <ChoiseOptions>
          {Teams.length > 0 ? (
            Teams.map((team: team) => (
              <Option key={team._id} to={`/teaminfo/${team._id}`}>
                <OptionImage src={team.pictureUrl} />
                <OptionName>{team.name}</OptionName>
              </Option>
            ))
          ) : (
            <ErrorOption>
              Ops... Esta competi????o ainda n??o possui times.
            </ErrorOption>
          )}
        </ChoiseOptions>
      </ChoiseTeamPage>
    );
  };

  const activeComponent = (): JSX.Element => {
    switch (activePage) {
      case "Region":
        return <RegionComponent />;

      case "Country":
        return <CountryComponent />;

      case "League":
        return <LeagueComponent />;

      case "Team":
        return <TeamComponent />;

      default:
        return <h1>N??o encontrado</h1>;
    }
  };

  document.title = "WSO | Escolher Time";
  document.body.style.backgroundColor = colors.black;
  return <Body>{loading ? <LoadingComponent /> : activeComponent()}</Body>;
};

export default FindTeam;
