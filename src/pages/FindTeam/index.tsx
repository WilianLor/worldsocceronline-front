import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios'
import {useSelector} from  'react-redux'
import {UserState} from '../../store/userReducer'

import config from '../../config/api.json'
import NavBar from '../../components/Navbar'
import ActionButton from '../../components/Button'

import Asia from '../../images/asia.svg'
import SouthAmerica from '../../images/southamerica.svg'
import NorthAmerica from '../../images/northamerica.svg'
import Africa from '../../images/africa.svg'
import Europa from '../../images/europe.svg'
import Oceania from '../../images/oceania.svg'
import { 
    Body, 
    Option, 
    ButtonGoBack, 
    ChoiseCountryHeader, 
    ChoiseCountryOptions, 
    ChoiseHeader, 
    ChoiseLeagueHeader, 
    ChoiseLeagueOptions, 
    ChoiseLeaguePage, 
    ChoiseOptions, 
    ChoiseRegionHeader, 
    ChoiseRegionOptions, 
    ChoiseTeamCountryPage, 
    ChoiseTeamPage, 
    ChoiseTeamRegionPage, 
    Competition, 
    CompetitionImage, 
    CompetitionInfo, 
    CompetitionName, 
    CompetitionTeamState, 
    ErrorOption, 
    GoBackContent, 
    HeaderCountryText, 
    HeaderCountryTitle, 
    HeaderLeagueText, 
    HeaderLeagueTitle, 
    HeaderRegionText, 
    HeaderRegionTitle, 
    HeaderTeamInfoText, 
    HeaderTeamInfoTitle, 
    HeaderText, 
    HeaderTitle, 
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
    Players, 
    PlayersAge, 
    PlayersAgeHeader, 
    PlayersHeader, 
    PLayersList, 
    PlayersName, 
    PlayersNameHeader, 
    PlayersOvr, 
    PlayersOvrHeader, 
    PlayersPosition, 
    PlayersPositionHeader, 
    ProfessionLabel, 
    ProfessionName, 
    ShowPlayers, 
    TeamCompetitions, 
    TeamCompetitionTitle,
    TeamImage, 
    TeamInfoContent, 
    TeamInfoHeader, 
    TeamInfoPage, 
    TeamInformations, 
    TeamName, 
    TeamPlayers, 
    TeamPlayersTitle, 
    VerticalDivider 
} from './styles'
import colors from '../../styles/colors';

interface Info {
    profession: string, 
    teamId: string,
    professionId: string,
    token: string
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

interface interest {
    _id: string,
    coachId: string
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
    const [TeamInfo, setTeamInfo] = useState({
        _id: "", 
        name: "", 
        pictureUrl: "", 
        presidentName: "", 
        coachName: "", 
        players: [], 
        nacionalCompetition: {
            _id: "", 
            name: "", 
            pictureUrl: "", 
            state: ""
        }, 
        regionalCompetition: {
            _id: "", 
            name: "", 
            pictureUrl: "", 
            state: ""
        }
    })

    const [interestedCoaches, setInterestedCoaches] = useState<Array<interest>>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {   
        console.log(infos)
        if(Regions.length < 1){
            axios.get(config.baseUrl + '/getregions').then((response: AxiosResponse) => {
                setRegions(response.data.Regions)
            }).catch(err => {
                console.log(err)
            })
        }
    })

    const infos = useSelector<UserState, Info>(state => ({
        profession: state.profession, 
        teamId: state.user.teamId, 
        professionId: state.user.professionId, 
        token: state.token
    }))

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
            setInterestedCoaches(response.data.teamData.interestedCoaches)
            setActivePage('TeamInfo')
        }).catch(err => {
            console.log(err)
        })
    }

    const showInterest = () => {
        setLoading(true)
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl + '/showinterest',  {teamId: TeamInfo._id}, header).then((response: AxiosResponse) => {
            setInterestedCoaches([{_id: 'id', coachId: infos.professionId}])
            setLoading(false)
        }).catch(e => {
            console.log('erro'+e)
        })
    }

    const removeInterest = () => {
        setLoading(true)
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl + '/removeinterest',  {teamId: TeamInfo._id}, header).then((response: AxiosResponse) => {
            setInterestedCoaches([])
            setLoading(false)
        }).catch(e => {
            console.log('erro'+e)
        })
    }

    const joinTeam = () => {
        setLoading(true)
        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }
      
        axios.post(config.baseUrl+'/jointeam/president',  {TeamId: TeamInfo._id}, header).then((response: AxiosResponse) => {
            window.location.href = "/home"
            setLoading(false)
        }).catch(e => {
            console.log('erro'+e)
        })
    }
 
    const Button: React.FC = () => {
        if(infos.profession === 'Coach') {
            if(infos.teamId === TeamInfo._id){
                return <> </>
            } else {
                let isInterested = false
                interestedCoaches.map((interest: interest) => interest.coachId === infos.professionId ? isInterested = true : '')
                
                if(isInterested){
                    return <ActionButton onClick={removeInterest} loading={loading} title="REMOVER INTERESSE"/>
                } else {
                    return <ActionButton onClick={showInterest} loading={loading} title="DEMONSTRAR INTERESSE"/>
                }
            }
        } else {
            if (infos.teamId === TeamInfo._id) {
                return <> </>
            }else {
                return <ActionButton onClick={joinTeam} title="INICIAR MANDATO" loading={loading} />
            }
        }
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
                        <Button />
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
    document.body.style.backgroundColor = colors.black
    return (
    <Body>
        <NavBar />
        {activeComponent()}
    </Body>
  );
}

export default ChoiseTeam;