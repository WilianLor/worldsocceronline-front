import axios, { AxiosResponse } from 'axios';
import { 
  useState, 
  useEffect 
} from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import NavBar from '../../components/Navbar';

import config from '../../config/api.json'
import { UserState } from '../../store/userReducer';

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
  TextAreaContainer 
} from './styles'

import colors from '../../styles/colors'

interface params {
  id: string
}

interface coach {
  _id: string,
  username: string,
  teamId: undefined | string,
}

interface team {
  _id: string,
  name: string
}

interface tender {
  _id: string,
  sender: string,
  coachId: coach,
  salary: number,
  teamId: team | undefined,
  date: string,
  monthsDuration: number,
  contractPlan: string,
}

interface tendersOption {
  _id: string,
  tendersId: tender,
  method: string
}

interface editValues {
  salary: number | undefined,
  monthsDuration: number | undefined,
  contractPlan: string | undefined,
}

interface Info {
  token: string,
  profession: string,
  teamId: string
}

const CoachTendersPage: React.FC = () => {

  const [tenders, setTenders]= useState<Array<tendersOption>>()
  const [activeTender, setActiveTender]= useState<tendersOption>()
  const [editMode, setEditMode] = useState<boolean>(false)

  const [editValues, setEditValues] = useState<editValues>()
  const [error, setError] = useState<string | undefined>()

  const infos = useSelector<UserState, Info>(state => ({
    token: state.token, 
    userId: state.user.userId, 
    profession: state.profession, 
    teamId: state.user.teamId
  }))

  const params = useParams<params>()

  useEffect(() => {

    const header = {
      headers: {'authorization': 'Bearer '+infos.token}
    }

    axios.get(config.baseUrl + '/getalltenders', header).then((response: AxiosResponse) => {

      setTenders(response.data)

      if(params.id && infos.profession === 'President') {
      
        const allTenders = response.data

        axios.get(config.baseUrl + '/getcoach/'+params.id, header).then((response: AxiosResponse) => {

          const paramCoach = {
            _id: response.data._id,
            tendersId: {
              _id: response.data._id,
              sender: '',
              coachId: {
                _id: response.data._id,
                username: response.data.username,
                teamId: response.data.teamId ? response.data.teamId : undefined,
              },
              teamId: undefined,
              salary: 0,
              date: '',
              monthsDuration: 0,
              contractPlan: '',
            },
            method: 'Creating'
          }

          let AlreadyHaveTender = false

          const toggleHaveTender = (tender: tendersOption) => {
            AlreadyHaveTender = true
            setActiveTender(tender)
          }

          allTenders.map((tender: tendersOption) => tender.tendersId.coachId._id ===  params.id ? toggleHaveTender(tender) : '')

          if(!AlreadyHaveTender) {
            setActiveTender(paramCoach)
            setEditMode(true)
          }

        })

      } 

    })
    // eslint-disable-next-line
  }, [])

  const getDate = (date: string) => {
    const initialDate = new Date(date)

    let dia  = initialDate.getDate().toString()
    let diaF = (dia.length === 1) ? '0'+dia : dia
    let mes  = (initialDate.getMonth()+1).toString() 
    let mesF = (mes.length === 1) ? '0'+mes : mes
    let anoF = initialDate.getFullYear()

    return diaF+" / "+mesF+" / "+anoF;
  }

  const sendAction = () => {
    setError(undefined)
    if(activeTender?.method === "Creating") {

      const header = {
        headers: {'authorization': 'Bearer '+infos.token}
      }

      axios.post(config.baseUrl+'/send/tenders/team', {coachId: activeTender.tendersId.coachId._id, monthsDuration: editValues?.monthsDuration, salary: editValues?.salary, contractPlan: editValues?.contractPlan},header).then((response: AxiosResponse) => {
        if(response.status === 201){
          window.location.href = "/coachtenders"
        } 
      })

    } else {

      const header = {
        headers: {'authorization': 'Bearer '+infos.token}
      }  

      const requestUrl = `${config.baseUrl}/counteroffer/tenders/${infos.profession === 'President' ? 'team' : 'coach'}/${activeTender?.tendersId._id}`

      axios.post(requestUrl , {monthsDuration: editValues?.monthsDuration ? editValues?.monthsDuration : activeTender?.tendersId.monthsDuration , salary: editValues?.salary ? editValues?.salary : activeTender?.tendersId.salary, contractPlan: editValues?.contractPlan ? editValues?.contractPlan : activeTender?.tendersId.contractPlan}, header).then((response: AxiosResponse) => {
        if(response.status === 200){
          console.log(response.data)
          window.location.href = "/coachtenders/"+activeTender?._id
        }else {
          console.log(response.data)
        }
      })

    }
  }

  const cancelTender = () => {

    setError(undefined)

    const header = {
      headers: {'authorization': 'Bearer '+infos.token}
    }

    const requestUrl = `${config.baseUrl}/action/tender/${infos.profession === 'President' ? 'team' : 'coach'}/cancel/${activeTender?.tendersId._id}`
    
    axios.post(requestUrl, {},header).then((response: AxiosResponse) => {
      if(response.status === 200){
        window.location.href = "/coachtenders"
      }
    })

  }

  const acceptTender = () => {

    setError(undefined)

    const header = {
      headers: {'authorization': 'Bearer '+infos.token}
    }

    const requestUrl = `${config.baseUrl}/action/tender/${infos.profession === 'President' ? 'team' : 'coach'}/accept/${activeTender?.tendersId._id}`
    
    axios.post(requestUrl, {},header).then((response: AxiosResponse) => {
      if(response.status === 200){
        window.location.href = "/coachtenders"
      } else if (response.status === 202){
        setError(response.data.error)
      }
    })
  }

  const ButtonsContainer = (): JSX.Element => {
  
  return (
    <ActionsButtons>
      {activeTender ? editMode ?<>
      {editValues ? 
        <Button onClick={sendAction}>CONFIRMAR</Button> 
        : ''}
      {
      activeTender.method === 'Creating' ? ''
        : <Button onClick={() => setEditMode(false)}>CANCELAR</Button>
      }</>
      : <>
      {
      activeTender.method === 'Send' ? ''
      : <><Button onClick={acceptTender}>ACEITAR</Button>
      <Button onClick={() => setEditMode(true)}>CONTRA-PROPOSTA</Button>
      </>
      }
      <Button onClick={cancelTender}>CANCELAR PROPOSTA</Button> </>: '' } 
    </ActionsButtons>
      )
  }

  document.body.style.backgroundColor = colors.black
  document.title = "WSO | Negocições de treinadores"
  return (
    <Body>
        <NavBar />
        <NegociationPage style={{color: colors.lightGray}}>
            <TendersContainer>
              <TabContainer>
                <Tab>{infos.profession === 'President' ? 'TREINADORES' : 'TIMES'}</Tab>
              </TabContainer>
              <List>
                { infos.profession === 'President' ?
                  tenders?.map((tender: tendersOption) => (
                    <Tender key={tender.tendersId.coachId._id} id={activeTender?.tendersId._id === tender.tendersId._id ? 'active' : 'disabled'} onClick={() => {setActiveTender(tender); setEditMode(false); setEditValues(undefined); setError(undefined)}}>
                      <Name>{tender.tendersId.coachId.username}</Name>
                      <Status id={tender.method === 'Send' ? 'sended' : 'received'}>{tender.method === 'Send' ? 'ENVIADO' : tender.method === 'Creating' ? 'CRIANDO' : 'RESPONDER'}</Status>
                    </Tender>
                  )):
                  tenders?.map((tender: tendersOption) => (
                    <Tender key={tender.tendersId.coachId._id} id={activeTender?.tendersId._id === tender.tendersId._id ? 'active' : 'disabled'} onClick={() => {setActiveTender(tender); setEditMode(false); setEditValues(undefined); setError(undefined)}}>
                      <Name>{tender.tendersId.teamId?.name}</Name>
                      <Status id={tender.method === 'Send' ? 'sended' : 'received'}>{tender.method === 'Send' ? 'ENVIADO' : tender.method === 'Creating' ? 'CRIANDO' : 'RESPONDER'}</Status>
                    </Tender>
                  ))
                }
              </List>
            </TendersContainer>
            <ContractCoach>
              <Contract>
                {activeTender ? editMode ? 
                <>
                <ConditionsContainer>
                  <SubTitle id={error ? 'error' : 'any' }>{error ? error : 'VOCÊ PODE ALTERAR TODOS OS CAMPOS DO CONTRATO'}</SubTitle>
                </ConditionsContainer>
                <ConditionsContainer>
                  <Container>
                    <SubTitle>{infos.profession === 'President' ? 'T R E I N A D O R' : 'T I M E'}</SubTitle>
                    <Title>{infos.profession === 'President' ? activeTender.tendersId.coachId.username : activeTender.tendersId.teamId?.name}</Title>
                  </Container>
                  <Container>
                    <SubTitle>{activeTender.method === 'Send' ? 'ENVIADO' : activeTender.method === 'Creating' ? 'CRIANDO' : 'RESPONDER'}</SubTitle>
                  </Container>
                </ConditionsContainer>
                <ConditionsContainer>
                  <Container>
                    <SubTitle>D U R A Ç Ã O</SubTitle>
                    <EditInput defaultValue={activeTender.tendersId.monthsDuration === 0 ? undefined : activeTender.tendersId.monthsDuration} type="number" placeholder="Digite o mês" onChange={e => setEditValues({salary: editValues?.salary, monthsDuration: parseInt(e.target.value), contractPlan: editValues?.contractPlan})}/>
                  </Container>
                  <Container>
                    <SubTitle>S A L Á R I O</SubTitle>
                    <EditInput defaultValue={activeTender.tendersId.salary === 0 ? undefined : activeTender.tendersId.salary} type="number" placeholder="Digite o salário" onChange={e => setEditValues({salary: parseInt(e.target.value), monthsDuration: editValues?.monthsDuration, contractPlan: editValues?.contractPlan})}/>
                  </Container>   
                </ConditionsContainer>
                <TextAreaContainer>
                  <SubTitle>P L A N O D E C O N T R A T O</SubTitle>
                  <EditTextArea defaultValue={activeTender.tendersId.contractPlan} placeholder="Digite as metas de contrato" onChange={e => setEditValues({salary: editValues?.salary, monthsDuration: editValues?.monthsDuration, contractPlan: e.target.value})}/>
                </TextAreaContainer></>
                : <>
                <ConditionsContainer>
                  <Container>
                    <SubTitle>{infos.profession === 'President' ? 'T R E I N A D O R' : 'T I M E'}</SubTitle>
                    <Title>{infos.profession === 'President' ? activeTender.tendersId.coachId.username : activeTender.tendersId.teamId?.name}</Title>
                  </Container>
                  <Container>
                    <SubTitle>{activeTender.method === 'Send' ? 'ENVIADO' : activeTender.method === 'Creating' ? 'CRIANDO' : 'RESPONDER'}</SubTitle>
                    <SubTitle>{getDate(activeTender.tendersId.date)}</SubTitle>
                  </Container>
                </ConditionsContainer>
                <ConditionsContainer>
                  <Container>
                    <SubTitle>D U R A Ç Ã O</SubTitle>
                    <Title>{activeTender.tendersId.monthsDuration}</Title>
                  </Container>
                  <Container>
                    <SubTitle>S A L Á R I O</SubTitle>
                    <Title>R$ {activeTender.tendersId.salary}</Title>
                  </Container>   
                </ConditionsContainer>
                <Container>
                  <SubTitle>P L A N O D E C O N T R A T O</SubTitle>
                  <ContractPlan>{activeTender.tendersId.contractPlan}</ContractPlan>
                </Container></>
                : <Alert>SELECIONE UMA PROPOSTA À ESQUERDA.</Alert> }
              </Contract>
              <ActionsButtons>
                {ButtonsContainer()}
              </ActionsButtons>
            </ContractCoach>
        </NegociationPage>
    </Body>
  );
}

export default CoachTendersPage;
