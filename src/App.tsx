import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios, { AxiosResponse } from 'axios'

import config from './config/api.json'

import './styles/global.css'

import Routes from './routes'
import { UserState } from './store/userReducer';
import { validateAction, logout } from './store/actions'

interface ValidateInfos {
  token: string,
  profession: string,
  teamId: string,
  passwordVersion: number
}

const App = () => {

  const ValidateInfos = useSelector<UserState, ValidateInfos>(state => ({token: state.token, profession: state.profession, teamId: state.user.teamId, passwordVersion: state.user.passwordVersion}))

  const dispatch = useDispatch()

  const validate = () => {

    const header = {
      headers: {'authorization': 'Bearer '+ValidateInfos.token}
    }

    axios.get(config.baseUrl + '/validate', header).then((response: AxiosResponse) => {
        
      if(ValidateInfos.passwordVersion !== response.data.data.passwordVersion) {
        dispatch(logout())
      } else {
        if(ValidateInfos.profession !== response.data.data.profession || ValidateInfos.teamId !== response.data.data.teamId){
          dispatch(validateAction(response.data.data))
        } 
      }

    }).catch(e => {
      console.log('erro'+e)
    })

    return;
  }


  if(ValidateInfos.token !== ""){
    validate()
  }

  return (
    <Routes />
  )
}


export default App;
