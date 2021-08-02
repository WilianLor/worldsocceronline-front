interface Infos {
  isLogged: boolean;
  profession: string;
  admin: boolean;
  teamId: string;
}

export const LandingIsLoggedRedirect = (Component: JSX.Element, infos: Infos) => {
  if(infos.isLogged){
      window.location.href = '/home';
  } else {
      return Component
  }
} 

export const isLogged = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    return Component;
  }
  window.location.href = "/login";
};

export const HaveProfession = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.profession !== "") {
      return Component;
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const isNotProfession = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.profession === "") {
      return Component;
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const coachOrPresident = (
  coachComponent: JSX.Element,
  presidentComponent: JSX.Element,
  infos: Infos
) => {
  if (infos.isLogged) {
    if (infos.profession !== "") {
      if (infos.teamId === "") {
        window.location.href = "/findteam";
      } else if (infos.profession === "Coach") {
        return coachComponent;
      } else {
        return presidentComponent;
      }
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const coachAndPresident = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.profession !== "") {
      return Component;
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const isPresident = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.profession === "President") {
      return Component;
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const presidentWithTeam = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.profession === "President") {
      if (infos.teamId !== "") {
        return Component;
      } else {
        window.location.href = "/findteam";
      }
    } else {
      window.location.href = "/home";
    }
  } else {
    window.location.href = "/login";
  }
};

export const coachAndPresidentWithTeam = (
  Component: JSX.Element,
  infos: Infos
) => {
  if (infos.isLogged) {
    if (infos.profession === "President") {
      if (infos.teamId !== "") {
        return Component;
      }
    } else if (infos.profession === "Coach") {
      return Component;
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const isCoach = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.profession === "Coach") {
      return Component;
    } else {
      window.location.href = "/choise";
    }
  } else {
    window.location.href = "/login";
  }
};

export const isAdmin = (Component: JSX.Element, infos: Infos) => {
  if (infos.isLogged) {
    if (infos.admin) {
      return Component;
    } else {
      window.location.href = "/home";
    }
  } else {
    window.location.href = "/login";
  }
};
