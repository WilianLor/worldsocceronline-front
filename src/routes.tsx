import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {coachOrPresident, isNotProfession} from './middlewares/middlewares'

import {useSelector} from 'react-redux'

import { UserState } from './store/userReducer'

import Landing from './pages/landing'
import Login from './pages/login'
import Singup from './pages/singup'
import Choise from './pages/choise'
import FindTeam from './pages/findTeam'
import CoachHome from './pages/coachHome'
import PresidentHome from './pages/presidentHome'

interface Infos {
    isLogged: boolean,
    profession: string,
    admin: boolean,
    teamId: string
}

function Routes() {

    const infos = useSelector<UserState, Infos>(state => ({isLogged: state.isLogged, profession: state.profession, admin: state.user.admin, teamId: state.user.teamId}))

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => <Landing />}/>
                <Route path="/login" exact render={() => <Login />}/>
                <Route path="/singup" exact render={() => <Singup />}/>
                <Route path="/choise" exact render={() => isNotProfession(<Choise />, <FindTeam />, infos)}/>
                <Route path="/findteam" exact render={() => <FindTeam />}/>
                <Route path="/home" exact render={() => coachOrPresident(<CoachHome />, <PresidentHome />, <FindTeam />, <Choise />, <Landing />, infos)}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;