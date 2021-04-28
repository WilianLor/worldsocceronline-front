import { 
    useEffect, 
    useState 
} from 'react'

import colors from '../../styles/colors'

import { useSelector } from 'react-redux'
import NavBar from '../../components/Navbar'
import { UserState } from '../../store/userReducer'
import config from '../../config/api.json'
import axios, { AxiosResponse } from 'axios'

import EditIcon from '@material-ui/icons/EditLocation'
import ConfirmIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

import { 
    TeamActive, 
    ActiveContract, 
    Body, 
    InfoContainer, 
    InfoName ,
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
    Warning 
} from './styles'

import { useParams } from 'react-router-dom';

interface Info {
    token: string,
    userId: string,
    profession: string,
    teamId: string,
    professionId: string
}

interface teamId {
    _id: string,
    name: string,
    pictureUrl: string,
}

interface activeContract {
    teamId: teamId,
    initialDate: string,
    salary: number,
    monthsDuration: number,
}

interface career {
    teamId: teamId
    initialDate: string,
    finalDate: string,
}

interface ProfessionData {
    profession: string,
    userId: string,
    username: string,
    description: string,
    countryImage: string,
    activeContract: activeContract,
    career: Array<career> 
}

interface params {
    id: string
}

const Profile: React.FC = () => {

    const params = useParams<params>()
    
    const [editDescriptionMode, setEditMode] = useState(false)
    
    const [professionData, setProfessionData] = useState<ProfessionData>({
        profession: '',
        userId: '',
        username: '',
        description: '',
        countryImage: '',
        activeContract: {
            teamId: {
                _id: '',
                name: '',
                pictureUrl: '',
            },
            initialDate: '',
            salary: 0,
            monthsDuration: 0,
        },
        career: []
    })

    const [description, setDescription] = useState(professionData.description)
    
    const infos = useSelector<UserState, Info>(state => ({token: state.token, userId: state.user.userId, profession: state.profession, teamId: state.user.teamId, professionId: state.user.professionId}))

    useEffect(() => {

        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }

        const requestId = !params.id ? infos.professionId : params.id

        axios.get(config.baseUrl+'/getprofile/'+requestId, header).then((response: AxiosResponse) => {
            setProfessionData(response.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const alterDescription = () => {

        const header = {
            headers: {'authorization': 'Bearer '+infos.token}
        }

        const requestString = professionData.profession === 'Coach' ? '/coach/editdescription' : '/president/editdescription'

        axios.post(config.baseUrl+requestString, {description,} ,header).then((response: AxiosResponse) => {
            setProfessionData({...professionData, description: description})
            setEditMode(false)
        })

    }

    const getInitialDate = (date: string) => {
        const initialDate = new Date(date)

        let dia  = initialDate.getDate().toString()
        let diaF = (dia.length === 1) ? '0'+dia : dia
        let mes  = (initialDate.getMonth()+1).toString() 
        let mesF = (mes.length === 1) ? '0'+mes : mes
        let anoF = initialDate.getFullYear()

        return diaF+" / "+mesF+" / "+anoF;
    }
    
    const getFinalDate = () => {
        const initialDate = new Date(professionData.activeContract.initialDate)
        const finalDate = new Date(initialDate.setMonth(initialDate.getMonth() + professionData.activeContract.monthsDuration)).getTime()
        const now = new Date().getTime()


        const aMonth = 1000*60*60*24*30

        const diference = finalDate - now

        const diferenceOfMonths =Math.round(diference/aMonth)

        return `${diferenceOfMonths} Meses`
    } 

    document.title = `WSO | ${professionData.username}`
    document.body.style.background = colors.black
    return (
        <Body>
            <NavBar />
            <ProfilePage>
                { professionData.username !== '' ? 
                <>
                    <PlayerData>
                        <Country>
                            <CountryImage src={professionData.countryImage}/>
                        </Country>
                        <NameContainer>
                            <Username>{professionData.username}</Username>
                            <Subtitle>{professionData.profession === 'Coach' ? 'T R E I N A D O R' : 'P R E S I D E N T E'}</Subtitle>
                        </NameContainer>
                        <DescriptionContainer>
                            {infos.userId === professionData.userId ? 
                                editDescriptionMode ? 
                                <> 
                                    <DescriptionEdit defaultValue={professionData.description} maxLength={200} onChange={(e) => setDescription(e.target.value)}/>
                                    <ButtonsContainer>
                                        <DescriptionButton onClick={() => alterDescription()}><ConfirmIcon style={{color: colors.lightGreen, fontSize: 40}}/></DescriptionButton>
                                        <DescriptionButton onClick={() => setEditMode(false)}><CancelIcon style={{color: colors.lightGreen, fontSize: 40}}/></DescriptionButton>
                                    </ButtonsContainer>
                                </>
                                : <> 
                                    <DescriptionText>{professionData.description ? professionData.description : `Este ${professionData.profession === "President" ? 'presidente' : 'treinador'} ainda não possui uma descrição.`}</DescriptionText>
                                    <ButtonsContainer>
                                        <DescriptionButton onClick={() => setEditMode(true)}><EditIcon style={{color: colors.lightGreen, fontSize: 40}}/></DescriptionButton>
                                    </ButtonsContainer>
                                </>
                            :
                                professionData.description ?
                                <DescriptionText>{professionData.description}</DescriptionText> 
                                : <DescriptionText>Este {professionData.profession === 'Coach' ? 'treinador' : 'presidente'} ainda não possui uma descrição.</DescriptionText> 
                            }
                        </DescriptionContainer>
                        {infos.profession === "President" && infos.teamId !== '' && infos.teamId !== professionData.activeContract.teamId._id && professionData.profession === 'Coach' ? 
                            <Button onClick={() => window.location.href = "/coachtenders/"+params.id}>ENVIAR PROPOSTA</Button>
                        :''}  
                    </PlayerData>
                    <ActiveContract>
                        {professionData.activeContract.initialDate !== '' ? <>
                        <TeamActive src={professionData.activeContract.teamId.pictureUrl}/>
                        <TeamName>{professionData.activeContract.teamId.name}</TeamName>
                        <Subtitle>T I M E</Subtitle>
                        <InfoName>{getInitialDate(professionData.activeContract.initialDate)}</InfoName>
                        <Subtitle>D A T A  I N Í C I A L</Subtitle>
                        {professionData.profession === 'Coach' ? <>
                        <InfoName>{getFinalDate()}</InfoName>
                        <Subtitle>R E S T A N T E S</Subtitle>
                        <InfoName>R$ {professionData.activeContract.salary}</InfoName>
                        <Subtitle>S A L Á R I O</Subtitle> </> : ''}</>
                        : <Alert><InfoName>Este {professionData.profession === "President" ? 'presidente' : 'treinador'} ainda não está treinando um time.</InfoName></Alert>}
                    </ActiveContract>
                    <CarrerContainer>
                        {professionData.career.length > 0 ? 
                            professionData.career.map((career: career) => (<>
                                <Career key={career.teamId._id}>
                                    <TeamImage src={career.teamId.pictureUrl}/>
                                    <InfoContainer>
                                        <InfoName>{career.teamId.name}</InfoName>
                                        <Subtitle>T I M E</Subtitle>
                                    </InfoContainer>
                                    <InfoContainer>
                                        <InfoName>{getInitialDate(career.initialDate)}</InfoName>
                                        <Subtitle>D A T A I N Í C I A L</Subtitle>
                                    </InfoContainer>
                                    <InfoContainer>
                                        <InfoName>{getInitialDate(career.finalDate)}</InfoName>
                                        <Subtitle>D A T A F I N A L</Subtitle>
                                    </InfoContainer>
                                </Career>
                                </>
                            ))  
                        : <Alert><InfoName>Este {professionData.profession === "President" ? 'presidente' : 'treinador'} ainda não possui um histórico.</InfoName></Alert>}
                    </CarrerContainer>  </>
                    : <Warning><Alert><InfoName>Este jogador não existe.</InfoName></Alert></Warning>}
            </ProfilePage>
        </Body>
    );
}

export default Profile;