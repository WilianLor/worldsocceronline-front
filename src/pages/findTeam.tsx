import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios, { AxiosResponse } from 'axios'
import {useSelector} from  'react-redux'
import {UserState} from '../store/userReducer'

import config from '../config/api.json'
import NavBar from '../components/navbar'

import Asia from '../images/asia.svg'
import SouthAmerica from '../images/southamerica.svg'
import NorthAmerica from '../images/northamerica.svg'
import Africa from '../images/africa.svg'
import Europa from '../images/europe.svg'
import Oceania from '../images/oceania.svg'

interface Info {
    profession: string, 
    teamId: string
}

interface region {
    _id: string,
    name: string,
    mainRegionalCompetitionName: string,
    secondaryRegionalCompetitionName: string,
    __v: number
}

interface country {
    _id: string,
    name: string,
    pictureUrl: string
}

interface league {
    _id: string,
    name: string,
    pictureUrl: string,
}

interface team {
    _id: string,
    name: string,
    pictureUrl: string,
}

interface player {
    _id: string,
    firstName: string,
    lastName: string,
    overall: number,
    position: string,
    age: number
}

const ChoiseTeam: React.FC = () => {

    const [activePage, setActivePage] = useState('Region')
    const [Region, setRegion] = useState({_id: "", name: ""})
    const [Country, setCountry] = useState({_id: "", name: ""})
    const [League, setLeague] = useState({_id: "", name: ""})
    const [Team, setTeam] = useState({_id: "", name: ""})

    const [Regions, setRegions] = useState([])
    const [Countries, setCountries] = useState([])
    const [Leagues, setLeagues] = useState([])
    const [Teams, setTeams] = useState([])
    const [TeamInfo, setTeamInfo] = useState({_id: "", name: "", pictureUrl: "", presidentName: "", coachName: "", players: [], nacionalCompetition: {_id: "", name: "", pictureUrl: "", state: ""}, regionalCompetition: {_id: "", name: "", pictureUrl: "", state: ""}})

    useEffect(() => {   
        if(Regions.length < 1){
            axios.get(config.baseUrl + '/getregions').then((response: AxiosResponse) => {
                setRegions(response.data.Regions)
            }).catch(err => {
                console.log(err)
            })
        }
    })

    const infos = useSelector<UserState, Info>(state => ({profession: state.profession, teamId: state.user.teamId}))

    const selectRegion = (region: {_id: string, name: string}) => {
        setRegion(region)

        axios.get(config.baseUrl + '/regioncountries/'+region._id).then((response: AxiosResponse) => {
            setCountries(response.data.countries)
            setActivePage('Country')
        }).catch(err => {
            console.log(err)
        })
    }

    const selectCountry = (country: {_id: string, name: string}) => {
        setCountry(country)

        axios.get(config.baseUrl + '/countryleagues/'+country._id).then((response: AxiosResponse) => {
            setLeagues(response.data.leagues)
            setActivePage('League')
        }).catch(err => {
            console.log(err)
        })

    }

    const selectLeague = (league: {_id: string, name: string}) => {
        setLeague(league)

        axios.get(config.baseUrl + '/leagueteams/'+league._id).then((response: AxiosResponse) => {
            setTeams(response.data.teams)
            setActivePage('Team')
        }).catch(err => {
            console.log(err)
        })
    }

    const selectTeam = (team: {_id: string, name: string}) => {
        setTeam(team)

        axios.get(config.baseUrl + '/teaminfo/'+team._id).then((response: AxiosResponse) => {
            setTeamInfo(response.data.teamData)
            setActivePage('TeamInfo')
        }).catch(err => {
            console.log(err)
        })
    }

    const getPosition = (position: any) => {
        switch(position){
            case 1: 
                return 'GOL'
            case 2: 
                return 'ZAG'
            case 3: 
                return 'LE'
            case 4: 
                return  'LD'
            case 7: 
                return 'PD'
            case 8: 
                return 'VOL'
            case 9: 
                return 'ATA'
            case 10:
                return 'MEI'
            case 11:
                return 'PE'
            case 12: 
                return 'ME'
            case 13:
                return 'MD'
            default:
                return ''
        }
    }

    const RegionComponent: React.FC = () => {
        return (
            <ChoiseTeamRegionPage>
                <ChoiseRegionHeader>
                    <HeaderRegionTitle>
                        Escolha a região do time.
                    </HeaderRegionTitle>
                    <HeaderRegionText>
                        Cada região tem uma competição principal e uma secundária, onde todos os times dos paises que pertencem dessa região brigam por vagas nessas competiçoes em suas ligas nacionais.
                    </HeaderRegionText>
                </ChoiseRegionHeader>
                <ChoiseRegionOptions>
                    {Regions.map((region: region) => (
                        <OptionRegion key={region._id} onClick={() => selectRegion({_id: region._id, name: region.name})}>
                            <OptionImageRegion src={region.name === 'América do Sul' ? SouthAmerica : region.name === 'América do Norte' ? NorthAmerica : region.name === 'Europa' ? Europa : region.name === 'África' ? Africa : region.name === 'Oceânia' ? Oceania : region.name === 'Ásia' ? Asia : undefined}/>
                            <OptionRegionName>
                                {region.name}
                            </OptionRegionName>
                        </OptionRegion>
                    ))}
                </ChoiseRegionOptions>
            </ChoiseTeamRegionPage>
        )
    }

    const CountryComponent: React.FC = () => {
        return (
            <ChoiseTeamCountryPage> 
                <ChoiseCountryHeader>
                    <HeaderCountryTitle>
                        Agora escolha o pais do time.
                    </HeaderCountryTitle>
                    <HeaderCountryText>
                        Cada Pais tem uma competição principal e uma secundária, onde todos os times dos paises que participam da secundária podem subir para a principal na próxima temporada.
                    </HeaderCountryText>
                    <GoBackContent>
                        <ButtonGoBack onClick={() => { setCountry({_id: "", name: ""}); setActivePage('Region')}}>
                            {Region.name}
                        </ButtonGoBack>
                    </GoBackContent>
                </ChoiseCountryHeader>
                <ChoiseCountryOptions>
                    {Countries.length > 0 ? Countries.map((country: country) => (
                        <OptionCountry key={country._id} onClick={() => selectCountry({_id: country._id, name: country.name})}>
                            <OptionImageCountry src={country.pictureUrl}/>
                            <OptionCountryName>
                                {country.name}
                            </OptionCountryName>
                        </OptionCountry>
                    )) : <ErrorOption>Ops... Esta Região ainda não possui paises.</ErrorOption>}
                </ChoiseCountryOptions>
            </ChoiseTeamCountryPage>
        )
    }
 
    const LeagueComponent: React.FC = () => {
        return (
            <ChoiseLeaguePage>
                <ChoiseLeagueHeader>
                    <HeaderLeagueTitle>
                        Agora escolha a liga do time.
                    </HeaderLeagueTitle>
                    <HeaderLeagueText>
                        Cada liga possui 20 times, os times que jogam na liga principal podem se classificar para as competições reginais.
                    </HeaderLeagueText>
                    <GoBackContent>
                            <ButtonGoBack onClick={() => { setCountry({_id: "", name: ""}); setRegion({_id: "", name: ""}); setActivePage('Region')}}>
                                {Region.name}
                            </ButtonGoBack>
                            <ButtonGoBack onClick={() => { setCountry({_id: "", name: ""}); setActivePage('Country')}}>
                                {Country.name}
                            </ButtonGoBack>
                    </GoBackContent>
                </ChoiseLeagueHeader>
                <ChoiseLeagueOptions>
                    {Leagues.length > 0 ? Leagues.map((league: league) => (
                        <OptionLeague key={league._id} onClick={() => selectLeague({_id: league._id, name: league.name})}>
                            <OptionImageLeague src={league.pictureUrl}/>
                            <OptionLeagueName>
                                {league.name}
                            </OptionLeagueName>
                        </OptionLeague>
                    )) : <ErrorOption>Ops... Este pais ainda não possui competições.</ErrorOption>}
                </ChoiseLeagueOptions>
            </ChoiseLeaguePage>
        )
    }

    const TeamComponent: React.FC = () => {
        return (
            <ChoiseTeamPage>
            <ChoiseHeader>
                <HeaderTitle>
                    Agora escolha o time.
                </HeaderTitle>
                <HeaderText>
                    Cada time possui orçamentos diferentes, jogadores diferentes, e pretenções diferentes.
                </HeaderText>
                <GoBackContent>
                    <ButtonGoBack onClick={() => {setLeague({_id: "", name: ""}); setCountry({_id: "", name: ""}); setRegion({_id: "", name: ""}); setActivePage('Region')}}>
                        {Region.name}
                    </ButtonGoBack>
                    <ButtonGoBack onClick={() => {setLeague({_id: "", name: ""}); setCountry({_id: "", name: ""}); setActivePage('Country')}}>
                        {Country.name}
                    </ButtonGoBack>
                    <ButtonGoBack onClick={() => {setLeague({_id: "", name: ""}); setActivePage('League')}}>
                        {League.name}
                    </ButtonGoBack>
                </GoBackContent>
            </ChoiseHeader>
            <ChoiseOptions>
            {Teams.length > 0 ? Teams.map((team: team) => (
                <Option key={team._id} onClick={() => selectTeam({_id: team._id, name: team.name})}>
                    <OptionImage src={team.pictureUrl}/>
                    <OptionName>
                        {team.name}
                    </OptionName>
                </Option>)) : <ErrorOption>Ops...    Esta competição ainda não possui times.</ErrorOption>}
            </ChoiseOptions>
        </ChoiseTeamPage>
        )
    }

    const TeamInfoComponent: React.FC = () => {
        return (
            <TeamInfoPage>
                <TeamInfoHeader>
                    <HeaderTeamInfoTitle>
                        Informações do time.
                    </HeaderTeamInfoTitle>
                    <HeaderTeamInfoText>
                        Aqui você pode vizualizar todos os jogadores deste time, se você for técnico pode demonstrar seu interesse em treinar este time, se for presidente pode assumir o mandato.
                    </HeaderTeamInfoText>
                    <GoBackContent>
                        <ButtonGoBack onClick={() => {setTeam({_id: "", name: ""}); setLeague({_id: "", name: ""}); setCountry({_id: "", name: ""}); setRegion({_id: "", name: ""}); setActivePage('Region')}}>
                            {Region.name}
                        </ButtonGoBack>
                        <ButtonGoBack onClick={() => {setTeam({_id: "", name: ""}); setLeague({_id: "", name: ""}); setCountry({_id: "", name: ""}); setActivePage('Country')}}>
                            {Country.name}
                        </ButtonGoBack>
                        <ButtonGoBack onClick={() => {setTeam({_id: "", name: ""}); setLeague({_id: "", name: ""}); setActivePage('League')}}>
                            {League.name}
                        </ButtonGoBack>
                        <ButtonGoBack onClick={() => {setTeam({_id: "", name: ""}); setActivePage('Team')}}>
                            {Team.name}
                        </ButtonGoBack>
                    </GoBackContent>
                </TeamInfoHeader>
                <TeamInfoContent>
                    <TeamInformations>
                        <TeamImage src={TeamInfo.pictureUrl}/>
                        <TeamName>
                            {TeamInfo.name}
                        </TeamName>
                        <ProfessionLabel>
                            Presidente: <ProfessionName>{TeamInfo.presidentName}</ProfessionName>
                        </ProfessionLabel>
                        <ProfessionLabel>
                            Técnico: <ProfessionName>{TeamInfo.coachName}</ProfessionName>
                        </ProfessionLabel>
                        {infos.profession === 'Coach' ? 
                        infos.teamId === TeamInfo._id ? '' :
                        <ActionButton onClick={() => {console.log('work')}}>DEMONSTRAR INTERESSE</ActionButton>
                        : infos.teamId === TeamInfo._id ? '' : <ActionButton onClick={() => {console.log('work')}}>INICIAR MANDATO</ActionButton>}
                    </TeamInformations>
                    <TeamPlayers>
                        <TeamPlayersTitle>Jogadores deste time:</TeamPlayersTitle>
                        <ShowPlayers>
                            <PlayersHeader>
                                <PlayersNameHeader>
                                    NOME
                                </PlayersNameHeader>
                                <PlayersPositionHeader>
                                    POS
                                </PlayersPositionHeader>
                                <PlayersOvrHeader>
                                    OVR
                                </PlayersOvrHeader>
                                <PlayersAgeHeader>
                                    IDD
                                </PlayersAgeHeader>
                            </PlayersHeader>
                            <PLayersList>
                                {TeamInfo.players.map((player: player) => (
                                    <Players key={player._id}>
                                        <PlayersName>
                                            {player.firstName.substring(1,0)+'. '+player.lastName}
                                        </PlayersName>
                                        <VerticalDivider/>
                                        <PlayersPosition>
                                            {getPosition(player.position)}
                                        </PlayersPosition>
                                        <VerticalDivider/>
                                        <PlayersOvr>
                                            {player.overall}
                                        </PlayersOvr>
                                        <VerticalDivider/>
                                        <PlayersAge>
                                            {player.age}
                                        </PlayersAge>
                                    </Players>
                                ))}
                            </PLayersList>
                        </ShowPlayers>
                    </TeamPlayers>
                    <TeamCompetitions>
                        <TeamCompetitionTitle>
                            Competições que este clube disputa nessa temporada.
                        </TeamCompetitionTitle>
                        <Competition>
                            <CompetitionImage src={TeamInfo.nacionalCompetition.pictureUrl}/>
                            <CompetitionInfo>
                                <CompetitionName>
                                    {TeamInfo.nacionalCompetition.name}
                                </CompetitionName>
                                <CompetitionTeamState>
                                    {TeamInfo.nacionalCompetition.state === "Participando" ? TeamInfo.nacionalCompetition.state+"º Lugar" : TeamInfo.nacionalCompetition.state === "" ? "Participará" : "Eliminado"}
                                </CompetitionTeamState>
                            </CompetitionInfo>
                        </Competition>
                        <Competition>
                            <CompetitionImage src={TeamInfo.regionalCompetition.pictureUrl}/>
                            <CompetitionInfo>
                                <CompetitionName>
                                    {TeamInfo.regionalCompetition.name}
                                </CompetitionName>
                                <CompetitionTeamState>
                                {TeamInfo.nacionalCompetition.state === "Participando" ? TeamInfo.nacionalCompetition.state : TeamInfo.nacionalCompetition.state === "" ? "Participará" : "Eliminado"}
                                </CompetitionTeamState>
                            </CompetitionInfo>
                        </Competition>
                    </TeamCompetitions>
                </TeamInfoContent>
            </TeamInfoPage>
        )
    }

    const activeComponent = (): JSX.Element => {
        switch(activePage) {
            case 'Region': 
                return <RegionComponent/>
                
            case 'Country':
                return <CountryComponent/>
            
            case 'League':
                return <LeagueComponent/>

            case 'Team':
                return <TeamComponent/>

            case 'TeamInfo':
                return <TeamInfoComponent/>
                
            default:
                return <h1>Não encontrado</h1>

        }
    }

    document.title = 'WSO | Escolher Time'  
    document.body.style.backgroundColor ="#121214"  
    return (
    <Body>
        <NavBar></NavBar>
        {activeComponent()}
        </Body>
  );
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
`

const ErrorOption = styled.h1`
    color: #121214;
`

const ActionButton = styled.button`
    margin-top: 1.25rem;
    color: #E1E1E6;
    background-color: #04D361;
    padding: 0.625rem;
    border-radius: .5rem;
    font-size: .9375rem;
    font-weight: 600;
    transition: .4s;
    cursor: pointer;

    &:hover {
        background-color: #00ff7f;
    }
`

const GoBackContent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: transparent;
`

const ButtonGoBack = styled.button`
    border-radius: .5rem;
    background-color: #202024;
    color: #E1E1E6;
    margin-left: 0.625rem;
    padding: 0.625rem;
    transition: .4s ease 0s;
    cursor: pointer;
    margin-bottom: -1rem;
`

const TeamInformations = styled.div`
    height: 100%;
    width: 26%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #202024;
    border-radius: .5rem;

    @media (max-width: 720px) {
        & {
            width: 95%;
        }
    }
`

const TeamImage = styled.img`
    width: 7.8125rem;
    margin-bottom: 0.625rem;
    background-color: #121214;
    border-radius: 25%;
    padding: 0.625rem;
`

const TeamName = styled.h2`
    color: #E1E1E6;
    text-align: center;
    margin-bottom: 1.25rem;
    font-weight: 500;
`

const ProfessionLabel = styled.div`
    color: #04D361;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 500;
`

const ProfessionName = styled.h3`
    color: #E1E1E6;
    margin-left: 0.625rem;
    font-weight: 400;
    font-size: 1.125rem;
`

const TeamPlayers = styled.div`
    height: 100%;
    background-color: #202024;
    width: 36%;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 720px) {
        & {
            width: 95%;
            margin-top: 1rem;
        }
    }
`

const TeamPlayersTitle = styled.h2`
    color: #E1E1E6;
    font-weight: 500;
`

const ShowPlayers = styled.div`
    width: 90%;
    height: 80%;
    background-color: #121214;
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #E1E1E6;
`

const PlayersHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 95%;
    margin-top: 0.625rem;
    color: #04D361;
`

const PlayersNameHeader = styled.h3`
    width: 51%;
`
const PlayersPositionHeader = styled.h3`
    width: 17%;
`

const PlayersOvrHeader = styled.h3`
    width: 17%;
`
const PlayersAgeHeader = styled.h3`
    width: 15%;
`

const PLayersList = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-top: 0.625rem;
    overflow-y: scroll;

    ::-webkit-scrollbar-track {
        background-color: #121214;
    }
    ::-webkit-scrollbar {
        width: .25rem;
        background: #F4F4F4;
    }
    ::-webkit-scrollbar-thumb {
        background: #04D361;
        border-radius: .25rem;
    }
`

const Players = styled.div`
    display: flex;
    flex-direction: row:
    justify-content: center;
`

const VerticalDivider = styled.span`
    width: 0.0625rem;
    height: 100%;
    background-color: #202024;
`

const PlayersName = styled.h4`
    margin-right: 0.625rem;
    width: 45%;
`

const PlayersAge = styled.h4`
    width: 15%;
    text-align: center;
`

const PlayersOvr = styled.h4`
    margin-right: 0.625rem;
    width: 13%;
    text-align: center;
`

const PlayersPosition = styled.h4`
    margin-right: 0.625rem;
    width: 15%;
    text-align: center;
`

const TeamCompetitions = styled.div`
    height: 100%;
    width: 36%;
    background-color: #202024;
    border-radius: .5rem;
    text-align: center;

    @media (max-width: 720px) {
        & {
            width: 95%;
            margin-top: 1rem;
        }
    }
`

const TeamCompetitionTitle = styled.h2`
    color: #E1E1E6;
    font-weight: 500;
    width: 90%;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
`

const Competition = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.625rem;
`

const CompetitionImage = styled.img`
    height: 5rem;
    width: 5rem;
    background-color: #121214;
    padding: 0.625rem;
    border-radius: 50%;
    margin-right: 1.875rem;
`

const CompetitionInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
`

const CompetitionName = styled.h3`
    color: #04D361;
`

const CompetitionTeamState = styled.h4`
    color: #E1E1E6;
`

const TeamInfoPage = styled.div`
    margin-top: 5vh;
    margin-left: 2vw;
    margin-right: 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    justify-content: space-between;
    height: 80vh;
`

const TeamInfoHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #04D361;
    color: #E1E1E6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const HeaderTeamInfoTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const HeaderTeamInfoText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const TeamInfoContent = styled.div`
    height: 55vh;
    width: 100%;
    border-radius: .25rem;
    background-color: transparent;
    color: #E1E1E6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 1.5rem;

    @media (max-width: 720px) {
        & {
            padding-left: 3%;
            margin-bottom: 1rem;
        }
    }
`

const ChoiseLeaguePage = styled.div`
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

const ChoiseLeagueHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #04D361;
    color: #E1E1E6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const HeaderLeagueTitle = styled.h1`
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const HeaderLeagueText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const ChoiseLeagueOptions = styled.div`
    min-height: 55vh;
    width: 100%;
    border-radius: .25rem;
    background-color: #202024;
    color: #E1E1E6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`

const OptionLeague = styled.button`
    width: 48%;
    height: 96%;
    text-decoration: none;
    border-radius: .5rem;
    color: #E1E1E6;
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: .125rem solid #121214;
    background-color: transparent;

    @media (max-width: 720px) {
        & {
            margin-top: 1rem;
            width: 92%; 
        }
    }

    &:hover {
        background-color: #121214;
        border-radius: .5rem;
    }
`

const OptionLeagueName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

const OptionImageLeague = styled.img`
    height: 16rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;

    @media (max-width: 720px) {
        & {
            height: 10rem;
        }
    }
`

const ChoiseTeamRegionPage = styled.div`
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

const ChoiseRegionHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #04D361;
    color: #E1E1E6;
`

const HeaderRegionTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const HeaderRegionText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 1.25rem;
`

const ChoiseRegionOptions = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #202024;
    color: #E1E1E6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;

    @media (max-width: 720px) {
        & {
            flex-direction: column;
        }
    }
`

const OptionRegion = styled.button`
    width: 15vw;
    height: 21rem;
    text-decoration: none;
    border-radius: .5rem;
    color: #E1E1E6;
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: .125rem solid #121214;
    background-color: transparent;

    @media (max-width: 720px) {
        & {
            margin-bottom: 1rem;
            width: 90%;
        }
    }

    &:hover {
        background-color:#121214;
        border-radius: .5rem;
    }
`

const OptionRegionName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

const OptionImageRegion = styled.img`
    width: 12rem;
    margin-top: 1.875rem;
`

const ChoiseTeamCountryPage = styled.div`
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

const ChoiseCountryHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #04D361;
    color: #E1E1E6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const HeaderCountryTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const HeaderCountryText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

const ChoiseCountryOptions = styled.div`
    min-height: 55vh;
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

const OptionCountry = styled.button`
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
    justify-content: space-between;
    border-bottom: .125rem solid #121214;
    background-color: transparent;
    margin-bottom: 1rem;

    &:hover {
        background-color: #121214;
        border-radius: .5rem;
    }
`

const OptionCountryName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

const OptionImageCountry = styled.img`
    width: 5rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
`

const ChoiseTeamPage = styled.div`
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

const ChoiseHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: #04D361;
    color: #E1E1E6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    margin-bottom: 0.625rem;
`

const ChoiseOptions = styled.div`
    min-height: 55vh;
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

const Option = styled.button`
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
    justify-content: space-between;
    border-bottom: .125rem solid #121214;
    background-color: transparent;
    margin-bottom: 1rem;

    &:hover {
        background-color: #121214;
        border-radius: .5rem;
    }
`

const OptionName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

const OptionImage = styled.img`
    width: 5rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
`

export default ChoiseTeam;