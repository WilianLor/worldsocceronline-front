import React, { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import LoadingComponent from "../../components/LoadingComponent";
import config from "../../config/api.json";

import FlagIcon from "@material-ui/icons/Flag";

import {
  Body,
  Option,
  CheckBox,
  CheckBoxField,
  CheckBoxLabel,
  Coach,
  FilterContent,
  FindCoachPage,
  Flag,
  Input,
  InputField,
  ListOfCoaches,
  Select,
  SelectField,
  Svg,
  SvgSelect,
  Username,
  PageButton,
  PageContent,
} from "./styles";
import colors from "../../styles/colors";

import Header from "../../components/Header";

import { CoachInterface, Country, param } from "./types";

import useData from "../../hooks/useData";

const FindCoach: React.FC = () => {
  const [listOfCountries, setListOfCountries] = useState([]);
  const [onlyInterested, setOnlyInterested] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [coaches, setCoaches] = useState({ coaches: [], pages: 0 });

  const [activePage, setActivePage] = useState(1);

  const { user } = useData();

  useEffect(() => {
    axios.get(config.baseUrl + "/countries").then((res: AxiosResponse) => {
      setListOfCountries(res.data.countries);
      return;
    });

    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .get(config.baseUrl + `/coaches/true/null/null`, header)
      .then((response: AxiosResponse) => {
        let pagesLenght = response.data.length / 20;

        if (response.data.length % 20 > 0) {
          pagesLenght = Math.ceil(pagesLenght);
        }

        setCoaches({ coaches: response.data, pages: pagesLenght });
        setLoading(false);
        return;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeOnlyInterested = (data: boolean) => {
    setOnlyInterested(data);

    const datafinal = data === false ? "false" : "true";

    Coaches({ param: datafinal, type: "onlyInterested" });
  };

  const changeCountry = (data: string) => {
    setCountry(data);

    Coaches({ param: data, type: "country" });
  };

  const changeSearchName = (data: string) => {
    setSearchName(data);

    Coaches({ param: data, type: "searchName" });
  };

  const showPages = () => {
    let pagesArray = [];
    for (let i = 1; i <= coaches.pages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  };

  const Coaches = (param: param) => {
    let param1;
    let param2;
    let param3;

    switch (param.type) {
      case "onlyInterested":
        param1 = param.param;
        param2 = country === "" ? "null" : country;
        param3 = searchName === "" ? "null" : searchName;
        break;
      case "country":
        param1 = onlyInterested === false ? "false" : "true";
        param2 = param.param === "" ? "null" : param.param;
        param3 = searchName === "" ? "null" : searchName;
        break;
      case "searchName":
        param1 = onlyInterested === false ? "false" : "true";
        param2 = country === "" ? "null" : country;
        param3 = param.param === "" ? "null" : param.param;
        break;
      default:
        param1 = onlyInterested === false ? "false" : "true";
        param2 = country === "" ? "null" : country;
        param3 = searchName === "" ? "null" : searchName;
        break;
    }

    const header = {
      headers: { authorization: "Bearer " + user.token },
    };

    axios
      .get(config.baseUrl + `/coaches/${param1}/${param2}/${param3}`, header)
      .then((response: AxiosResponse) => {
        let pagesLenght = response.data.length / 20;

        if (response.data.length % 20 > 0) {
          pagesLenght = Math.ceil(pagesLenght);
        }

        setCoaches({ coaches: response.data, pages: pagesLenght });
      })
      .catch((e) => {
        console.log("erro" + e);
      });
  };

  document.title = "WSO | Procurar Treinador";
  document.body.style.backgroundColor = colors.black;
  return (
    <Body>
      {loading ? (
        <LoadingComponent />
      ) : (
        <FindCoachPage>
          <Header
            title="Procurar por treinadores."
            text="Encontre um treinador com base nos filtros abaixo e faça sua
              proposta."
          >
            <FilterContent>
              <CheckBoxField>
                <CheckBox
                  type="checkbox"
                  name="interest"
                  defaultChecked={true}
                  onChange={(e) => {
                    changeOnlyInterested(e.target.checked);
                  }}
                />
                <CheckBoxLabel>Somente os interessados.</CheckBoxLabel>
              </CheckBoxField>
              <SelectField>
                <SvgSelect>
                  <FlagIcon style={{ color: colors.green }} />
                </SvgSelect>
                <Select
                  required
                  onChange={(e) => {
                    changeCountry(e.target.value);
                  }}
                >
                  <Option value="">Selecione um pais</Option>
                  {listOfCountries.map((country: Country) => (
                    <Option key={country._id} value={country._id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </SelectField>
              <InputField>
                <Svg>
                  <svg
                    fill={colors.green}
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                </Svg>
                <Input
                  placeholder="Pesquisar pelo nome de usuário"
                  onChange={(e) => {
                    changeSearchName(e.target.value);
                  }}
                />
              </InputField>
            </FilterContent>
            <PageContent>
              {showPages().map((page) => (
                <PageButton
                  key={page}
                  id={activePage === page ? "active" : "disabled"}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </PageButton>
              ))}
            </PageContent>
          </Header>
          <ListOfCoaches>
            {coaches.coaches.map((coach: CoachInterface, index) =>
              (index + 1) / 20 <= activePage &&
              (index + 1) / 20 > activePage - 1 ? (
                <Coach key={coach._id} to={"/userprofile/" + coach._id}>
                  <Username>{coach.username}</Username>
                  {coach.teamImage ? (
                    <Flag src={coach.teamImage} />
                  ) : (
                    ''
                  )}
                  <Flag src={coach.countryImage} />
                </Coach>
              ) : (
                ""
              )
            )}
          </ListOfCoaches>
        </FindCoachPage>
      )}
    </Body>
  );
};

export default FindCoach;
