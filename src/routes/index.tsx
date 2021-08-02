import { BrowserRouter, Switch, Route } from "react-router-dom";

import useData from '../hooks/useData'

import NavBar from "./Navbar";

import Landing from "../pages/Landing/index";
import Login from "../pages/Login/index";
import Signup from "../pages/Signup/index";
import Choise from "../pages/Choise/index";
import FindTeam from "../pages/FindTeam/index";
import CoachHome from "../pages/CoachHome/index";
import PresidentHome from "../pages/PresidentHome/index";
import FindCoach from "../pages/FindCoach/index";
import UserProfile from "../pages/UserProfile/index";
import CoachTenders from "../pages/CoachTenders/index";
import ClubBalance from "../pages/ClubBalance";
import Sponsorship from "../pages/Sponsorship/index";
import TeamInfo from '../pages/TeamInfo/index';
import SendMail from "../pages/SendMail/index";
import ResetPassword from "../pages/ResetPassword/index";

const Routes = () => {

  const { user } = useData()
  
  const isLogged = (Component: JSX.Element) => {
    if (user.isLogged) {
      if(user.profession === "Coach") {
        if(user.user.teamId !== "") {
          return <CoachHome />
        } else {
          return <FindTeam />
        }
      } else {
        if(user.user.teamId !== "") {
          return <PresidentHome />
        } else {
          return <FindTeam />
        }
      }
    }
    return Component
  };
  
  const HaveProfession = (Component: JSX.Element) => {
    if (user.isLogged) {
      if (user.profession !== "") {
        return Component;
      } else {
        return <Choise />
      }
    } else {
      return <Login />
    }
  };
  
  const isNotProfession = (Component: JSX.Element) => {
    if (user.isLogged) {
      if (user.profession === "") {
        return Component;
      } else {
        if(user.profession === 'Coach') {
          return <CoachHome />
        } else {
          return <PresidentHome />
        }
      }
    } else {
      return <Login />
    }
  };
  
  const coachOrPresident = (
    coachComponent: JSX.Element,
    presidentComponent: JSX.Element,
  ) => {
    if (user.isLogged) {
      if (user.profession !== "") {
        if (user.user.teamId === "") {
          return <FindTeam />
        } else if (user.profession === "Coach") {
          return coachComponent;
        } else {
          return presidentComponent;
        }
      } else {
        return <Choise />
      }
    } else {
      return <Login />
    }
  };
  
  const presidentWithTeam = (Component: JSX.Element) => {
    if (user.isLogged) {
      if (user.profession === "President") {
        if (user.user.teamId !== "") {
          return Component;
        } else {
          return <FindTeam />
        }
      } else {
        if(user.profession === 'Coach' && user.user.teamId !== "") {
          return <CoachHome />
        } else {
          return <FindTeam />
        }
      }
    } else {
      return <Login />
    }
  };
  
  const coachAndPresidentWithTeam = (
    Component: JSX.Element,
  ) => {
    if (user.isLogged) {
      if (user.profession === "President") {
        if (user.user.teamId !== "") {
          return Component;
        }
      } else if (user.profession === "Coach") {
        return Component;
      } else {
        return <Choise />
      }
    } else {
      return <Login />
    }
  };

  return (
    <BrowserRouter>
      {user.isLogged  ? <NavBar /> : <></>}
      <Switch>
        <Route
          path="/"
          exact
          render={() => isLogged(<Landing />)}
        />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/signup" exact render={() => <Signup />} />
        <Route path="/sendmailreset" exact render={() => <SendMail />} />
        <Route path="/resetpassword/:userId/:token" exact render={() => <ResetPassword />} />
        <Route
          path="/choise"
          exact
          render={() => isNotProfession(<Choise />)}
        />
        <Route
          path="/findteam"
          exact
          render={() => HaveProfession(<FindTeam />)}
        />
        <Route
          path="/findcoach"
          exact
          render={() => presidentWithTeam(<FindCoach />)}
        />
        <Route
          path="/userprofile/:id?"
          exact
          render={() => HaveProfession(<UserProfile />)}
        />
        <Route
          path="/coachtenders/:id?"
          exact
          render={() => coachAndPresidentWithTeam(<CoachTenders />)}
        />
        <Route 
          path="/teaminfo/:id"
          exact
          render={() => HaveProfession(<TeamInfo />)}
        />
        <Route
          path="/home"
          exact
          render={() =>
            coachOrPresident(<CoachHome />, <PresidentHome />)
          }
        />
        <Route
          path="/clubbalance"
          exact
          render={() => presidentWithTeam(<ClubBalance />)}
        />
        <Route 
          path="/sponsorship"
          exact
          render={() => presidentWithTeam(<Sponsorship />)}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
