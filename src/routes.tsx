import { 
    BrowserRouter, 
    Switch, 
    Route 
} from 'react-router-dom'

import {
    coachOrPresident, 
    LandingIsLoggedRedirect, 
    isNotProfession, 
    HaveProfession, 
    presidentWithTeam, 
    coachAndPresidentWithTeam
} from './middlewares/middlewares'

import {useSelector} from 'react-redux'
import { UserState } from './store/userReducer'

import Landing from './pages/Landing/index'
import Login from './pages/Login/index'
import Singup from './pages/Singup/index'
import Choise from './pages/Choise/index'
import FindTeam from './pages/FindTeam/index'
import CoachHome from './pages/CoachHome/index'
import PresidentHome from './pages/PresidentHome/index'
import FindCoach from './pages/FindCoach/index'
import UserProfile from './pages/UserProfile/index'
import CoachTendersPage from './pages/CoachTendersPage/index'

interface Infos {
    isLogged: boolean,
    profession: string,
    admin: boolean,
    teamId: string
}

function Routes() {

    const infos = useSelector<UserState, Infos>(state => ({
        isLogged: state.isLogged, 
        profession: state.profession, 
        admin: state.user.admin, 
        teamId: state.user.teamId
    }))

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => LandingIsLoggedRedirect(<Landing />, infos)}/>
                <Route path="/login" exact render={() => <Login />}/>
                <Route path="/singup" exact render={() => <Singup />}/>
                <Route path="/choise" exact render={() => isNotProfession(<Choise />, infos)}/>
                <Route path="/findteam" exact render={() => HaveProfession(<FindTeam />, infos)}/>
                <Route path="/findcoach" exact render={() => presidentWithTeam(<FindCoach />, infos)}/>
                <Route path="/userprofile/:id?" exact render={() => HaveProfession(<UserProfile />, infos)}/>
                <Route path="/coachtenders/:id?" exact render={() => coachAndPresidentWithTeam(<CoachTendersPage />, infos)}/>
                <Route path="/home" exact render={() => coachOrPresident(<CoachHome />, <PresidentHome />, infos)}/>
             </Switch>
        </BrowserRouter>
    )
}

export default Routes;