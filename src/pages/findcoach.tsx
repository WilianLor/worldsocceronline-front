import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import axios, { AxiosResponse } from 'axios';
import {useSelector} from  'react-redux'
import {UserState} from '../store/userReducer'

import config from '../config/api.json'
import NavBar from '../components/navbar'

import FlagIcon from '@material-ui/icons/Flag'
import DownArrow from '../images/arrowDown.png'

interface Country {
    _id: string,
    name: string
}

interface Coach {
    _id: string,
    username: string,
    countryImage: string,
    teamImage: string,
}

interface Info {
    professionId: string,
    token: string
}

const FindCoach: React.FC = () => {

    const [listOfCountries, setListOfCountries] = useState([])
    const [onlyInterested, setOnlyInterested] = useState<boolean>(false)
    const [country, setCountry] = useState<string>('')
    const [searchName, setSearchName] = useState<string>('')

    const [coaches, setCoaches] = useState<Array<Coach>>([])

    const infos = useSelector<UserState, Info>(state => ({professionId: state.user.professionId, token: state.token}))

    useEffect(() => {
        axios.get(config.baseUrl+'/countries').then((res: AxiosResponse)=> {
            setListOfCountries(res.data.countries)                
            return;
        })

        Coaches()
    }, []);

    const changeOnlyInterested = (data: boolean) => {
        setOnlyInterested(data)

        Coaches()
    }

    const changeCountry = (data: string) => {
        setCountry(data)

        Coaches()
    }

    const changeSearchName = (data: string) => {
        setSearchName(data)

        Coaches()
    }

    const Coaches = () => {
        const param1 = onlyInterested === false ? 'false' : 'true'
        const param2 = country === '' ? 'null' : country
        const param3 = searchName === '' ? 'null' : searchName

        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.get(`${config.baseUrl}/coaches/${param1}/${param2}/${param3}`, header).then((response: AxiosResponse) => {
            setCoaches(response.data.coaches)
            console.log(response.data.coaches)
        }).catch(e => {
            console.log('erro'+e)
        })

    }

    document.title = 'WSO | Procurar Treinador'  
    document.body.style.backgroundColor ="#121214"  
    return (
        <Body>
            <NavBar />
            <FindCoachPage>
                <Header>
                    <HeaderTitle>Procurar por treinadores.</HeaderTitle>
                    <HeaderText>Encontre um treinador com base nos filtros abaixo e faça sua proposta.</HeaderText>
                    <FilterContent>
                        <CheckBoxField>
                            <CheckBox type="checkbox" name="interest" onChange={(e) => {changeOnlyInterested(e.target.checked)}}/>
                            <CheckBoxLabel>Somente os interessados.</CheckBoxLabel>
                        </CheckBoxField>
                        <SelectField>
                            <SvgSelect>
                                <FlagIcon style={{color: "#04D361"}}/>
                            </SvgSelect>
                            <Select required onChange={(e) => {changeCountry(e.target.value)}}>
                            <Option value="" >Selecione um pais</Option>
                                {
                                    listOfCountries.map((country: Country) => <Option key={country._id} value={country._id}>{country.name}</Option>)
                                }
                            </Select>
                        </SelectField>
                        <InputField>
                            <Svg>
                                <svg fill="#04D361" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                            </Svg>
                            <Input placeholder="Pesquisar pelo nome de usuário" onChange={(e) => {changeSearchName(e.target.value)}}/>
                        </InputField>
                    </FilterContent>
                </Header>
                <ListOfCoaches>
                    {coaches.map((coach: Coach) => {
                        <Coach>
                            <Username>
                                {coach.username}
                            </Username>
                            {coach.teamImage ? 
                                <Flag src={coach.teamImage}/> :
                                <ContentText>Não possui um time</ContentText>}
                            <Flag src={coach.countryImage}/>
                        </Coach>
                    })}
                </ListOfCoaches>
            </FindCoachPage>
        </Body>
    );
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
`

const FindCoachPage = styled.div`
    margin-top: 5vh;
    margin-left: 2vw;
    margin-right: 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    justify-content: space-between;
    height: auto;
`

const Header = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #04D361;
    color: #E1E1E6;
`

const HeaderTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const HeaderText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 1.25rem;
`

const ListOfCoaches = styled.div`
    min-height: 50vh;
    width: 100%;
    border-radius: .25rem;
    background-color: #202024;
    color: #E1E1E6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`

const Coach = styled.a`
    width: 11rem;
    height: 22vh;
    text-decoration: none;
    border-radius: .5rem;
    color: #E1E1E6;
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-bottom: .125rem solid #121214;
    background-color: transparent;
    margin-bottom: 1rem;

    &:hover {
        background-color: #121214;
        border-radius: .5rem;
    }
`

const Username = styled.h3`
    font-size: 1.25rem;
    color: #E1E1E6;
`

const ContentText = styled.h3`
    font-size: 1rem;
    color: #E1E1E6;
`

const Flag = styled.img`

`

const FilterContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 2rem;
    margin-left: 2rem;
    align-items: center;

    @media (max-width: 1154px) {
        flex-direction: column;
        justfy-content: center;
    }
`

const CheckBoxField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #E1E1E6;
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;
    justify-content: center;
    color: gray;
`   

const CheckBox = styled.input`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .5rem;
    border: .125rem solid #E1E1E6;

    &:checked {
        background-color: #04D361;
    }
`
const CheckBoxLabel = styled.label`
    font-size: 1rem;
`

const SelectField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #E1E1E6 url(${DownArrow}) 95.5% 50% no-repeat;
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;
`

const SvgSelect = styled.div`
    margin-left: 1rem;
`

const Select = styled.select`
    background: none;
    height: 3.375rem;
    width: 21.9375rem;
    font-size: 1rem;
    font: 400 Arial;
    color: gray;
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: .625rem;
    position: absolute;
    border-radius: .3125rem;
    border: .125rem solid #04D361;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &#Invalid {
        border: .125rem solid #F44336;
    }

    &:focus {
        border: .125rem solid  #E1E1E6;
    }

    &:required:invalid {
        color: gray;
    }
`

const Option = styled.option`
    
    color: gray;
    font-size: 1rem;
    background-color: ##E1E1E6;
    line-height: 12.5rem;

    &:hover {
        background-color: #04D361;
    }

    &[value=""][disabled] {
        display: none;
    }
      
`

const InputField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #E1E1E6;
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;
`

const Svg = styled.div`
    margin-left: 1.25rem;
`

const Input = styled.input`
    background: none;
    height: 3.125rem;
    width: 17.9375rem;
    font-size: 1rem;
    color: gray;
    font: 400 Arial;
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: 0.625rem;
    position: absolute;
    border-radius: 0.3125rem;
    border: 0.125rem solid #04D361;

    &#Invalid {
        border: 0.125rem solid #F44336;
    }

    &:-ms-input-placeholder {  
        color: #202024;  
    }

    &:focus {
        border: 0.125rem solid  #E1E1E6;
    }
`

export default FindCoach;