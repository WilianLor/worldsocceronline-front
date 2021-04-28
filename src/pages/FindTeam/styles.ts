import styled from 'styled-components'
import colors from '../../styles/colors'

export const Body = styled.div`
    display: flex;
    flex-direction: column;
`

export const ErrorOption = styled.h1`
    color: ${colors.black};
`

export const ActionButton = styled.button`
    margin-top: 1.25rem;
    color: ${colors.lightGray};
    background-color: ${colors.green};
    padding: 0.625rem;
    border-radius: .5rem;
    font-size: .9375rem;
    font-weight: 600;
    transition: .4s;
    cursor: pointer;
    width: 14rem;
    height: 2.5rem;

    &:hover {
        background-color: ${colors.lightGreen};
    }
`

export const GoBackContent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: transparent;
`

export const ButtonGoBack = styled.button`
    border-radius: .5rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
    margin-left: 0.625rem;
    padding: 0.625rem;
    transition: .4s ease 0s;
    cursor: pointer;
    margin-bottom: -1rem;
`

export const TeamInformations = styled.div`
    height: 100%;
    width: 26%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.dark};
    border-radius: .5rem;

    @media (max-width: 720px) {
        & {
            width: 95%;
        }
    }
`

export const TeamImage = styled.img`
    width: 7.8125rem;
    margin-bottom: 0.625rem;
    padding: .8rem;
    background-color: ${colors.black};
    border-radius: .5rem;
`

export const TeamName = styled.h2`
    color: ${colors.lightGray};
    text-align: center;
    margin-bottom: 1.25rem;
    font-weight: 500;
`

export const ProfessionLabel = styled.div`
    color: ${colors.green};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 500;
`

export const ProfessionName = styled.h3`
    color: ${colors.lightGray};
    margin-left: 0.625rem;
    font-weight: 400;
    font-size: 1.125rem;
`

export const TeamPlayers = styled.div`
    height: 100%;
    background-color: ${colors.dark};
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

export const TeamPlayersTitle = styled.h2`
    color: ${colors.lightGray};
    font-weight: 500;
`

export const ShowPlayers = styled.div`
    width: 90%;
    height: 80%;
    background-color: ${colors.black};
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.lightGray};
`

export const PlayersHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 95%;
    margin-top: 0.625rem;
    color: ${colors.green};
`

export const PlayersNameHeader = styled.h3`
    width: 51%;
`
export const PlayersPositionHeader = styled.h3`
    width: 17%;
`

export const PlayersOvrHeader = styled.h3`
    width: 17%;
`
export const PlayersAgeHeader = styled.h3`
    width: 15%;
`

export const PLayersList = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-top: 0.625rem;
    overflow-y: scroll;

    ::-webkit-scrollbar-track {
        background-color: ${colors.black};
    }
    ::-webkit-scrollbar {
        width: .25rem;
        background: ${colors.lightGray};
    }
    ::-webkit-scrollbar-thumb {
        background: ${colors.green};
        border-radius: .25rem;
    }
`

export const Players = styled.div`
    display: flex;
    flex-direction: row:
    justify-content: center;
`

export const VerticalDivider = styled.span`
    width: 0.0625rem;
    height: 100%;
    background-color: ${colors.dark};
`

export const PlayersName = styled.h4`
    margin-right: 0.625rem;
    width: 45%;
`

export const PlayersAge = styled.h4`
    width: 15%;
    text-align: center;
`

export const PlayersOvr = styled.h4`
    margin-right: 0.625rem;
    width: 13%;
    text-align: center;
`

export const PlayersPosition = styled.h4`
    margin-right: 0.625rem;
    width: 15%;
    text-align: center;
`

export const TeamCompetitions = styled.div`
    height: 100%;
    width: 36%;
    background-color: ${colors.dark};
    border-radius: .5rem;
    text-align: center;

    @media (max-width: 720px) {
        & {
            width: 95%;
            margin-top: 1rem;
        }
    }
`

export const TeamCompetitionTitle = styled.h2`
    color: ${colors.lightGray};
    font-weight: 500;
    width: 90%;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
`

export const Competition = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.625rem;
`

export const CompetitionImage = styled.img`
    height: 5rem;
    width: 5rem;
    background-color: ${colors.black};
    padding: 0.625rem;
    border-radius: 50%;
    margin-right: 1.875rem;
`

export const CompetitionInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
`

export const CompetitionName = styled.h3`
    color: ${colors.green};
`

export const CompetitionTeamState = styled.h4`
    color: ${colors.lightGray};
`

export const TeamInfoPage = styled.div`
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

export const TeamInfoHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.green};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const HeaderTeamInfoTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const HeaderTeamInfoText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const TeamInfoContent = styled.div`
    min-height: 60vh;   
    width: 100%;
    border-radius: .25rem;
    background-color: transparent;
    color: ${colors.lightGray};
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

export const ChoiseLeaguePage = styled.div`
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

export const ChoiseLeagueHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.green};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const HeaderLeagueTitle = styled.h1`
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const HeaderLeagueText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const ChoiseLeagueOptions = styled.div`
    min-height: 60vh;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`

export const OptionLeague = styled.button`
    width: 48%;
    height: 96%;
    text-decoration: none;
    border-radius: .5rem;
    color: ${colors.lightGray};
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: .125rem solid ${colors.black};
    background-color: transparent;

    @media (max-width: 720px) {
        & {
            margin-top: 1rem;
            width: 92%; 
        }
    }

    &:hover {
        background-color: ${colors.black};
        border-radius: .5rem;
    }
`

export const OptionLeagueName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

export const OptionImageLeague = styled.img`
    height: 16rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;

    @media (max-width: 720px) {
        & {
            height: 10rem;
        }
    }
`

export const ChoiseTeamRegionPage = styled.div`
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

export const ChoiseRegionHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.green};
    color: ${colors.lightGray};
`

export const HeaderRegionTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const HeaderRegionText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 1.25rem;
`

export const ChoiseRegionOptions = styled.div`
    min-height: 55vh;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
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

export const OptionRegion = styled.button`
    width: 15vw;
    height: 21rem;
    text-decoration: none;
    border-radius: .5rem;
    color: ${colors.lightGray};
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: .125rem solid ${colors.black};
    background-color: transparent;

    @media (max-width: 720px) {
        & {
            margin-bottom: 1rem;
            width: 90%;
        }
    }

    &:hover {
        background-color:${colors.black};
        border-radius: .5rem;
    }
`

export const OptionRegionName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

export const OptionImageRegion = styled.img`
    width: 12rem;
    margin-top: 1.875rem;
`

export const ChoiseTeamCountryPage = styled.div`
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

export const ChoiseCountryHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.green};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const HeaderCountryTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const HeaderCountryText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const ChoiseCountryOptions = styled.div`
    min-height: 57.5vh;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`

export const OptionCountry = styled.button`
    width: 11rem;
    height: 22vh;
    text-decoration: none;
    border-radius: .5rem;
    color: ${colors.lightGray};
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: .125rem solid ${colors.black};
    background-color: transparent;
    margin-bottom: 1rem;

    &:hover {
        background-color: ${colors.black};
        border-radius: .5rem;
    }
`

export const OptionCountryName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

export const OptionImageCountry = styled.img`
    width: 5rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
`

export const ChoiseTeamPage = styled.div`
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

export const ChoiseHeader = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.green};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const HeaderTitle = styled.h1`
    margin-left: 1.25rem;
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const HeaderText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 0.625rem;
`

export const ChoiseOptions = styled.div`
    min-height: 57.5vh;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`

export const Option = styled.button`
    width: 11rem;
    height: 22vh;
    text-decoration: none;
    border-radius: .5rem;
    color: ${colors.lightGray};
    transition: .4s ease 0s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: .125rem solid ${colors.black};
    background-color: transparent;
    margin-bottom: 1rem;

    &:hover {
        background-color: ${colors.black};
        border-radius: .5rem;
    }
`

export const OptionName = styled.h2`
    font-size: 1.125rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.875rem;
`

export const OptionImage = styled.img`
    width: 5rem;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
`