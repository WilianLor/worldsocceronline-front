interface Infos {
    isLogged: boolean,
    profession: string,
    admin: boolean,
    teamId: string
}

export const isLogged = (Component: JSX.Element, errorComponent: JSX.Element, infos: Infos): JSX.Element => {

    if(infos.isLogged){
        return Component
    }
    return errorComponent;

}

export const isNotProfession = (Component: JSX.Element, errorComponent: JSX.Element, infos: Infos): JSX.Element => {

    if(infos.isLogged){
        if(infos.profession === ""){
            return Component
        }
        return errorComponent
    }
    return errorComponent

}

export const isPresident = (Component: JSX.Element, errorComponent: JSX.Element, infos: Infos): JSX.Element => {

    if(infos.isLogged){
        if(infos.profession === "President"){
            return Component
        }
        return errorComponent
    }
    return errorComponent

}

export const coachOrPresident = (coachComponent: JSX.Element, presidentComponent: JSX.Element, findTeamComponent: JSX.Element, choiseComponent: JSX.Element, errorComponent: JSX.Element, infos: Infos): JSX.Element => {

    if(infos.isLogged){
        if(infos.profession !== ""){
            if(infos.teamId === ""){
                return findTeamComponent
            }
            else if(infos.profession === "Coach"){
                return coachComponent
            } 
            else {
                return presidentComponent
            }
        }
        return choiseComponent
    }
    return errorComponent

}

export const isCoach = (Component: JSX.Element, errorComponent: JSX.Element, infos: Infos): JSX.Element => {
    
    if(infos.isLogged){
        if(infos.profession === "Coach"){
            return Component
        }
        return errorComponent
    }
    return errorComponent

}

export const isAdmin = (Component: JSX.Element, errorComponent: JSX.Element, infos: Infos): JSX.Element => {
    
    if(infos.isLogged){
        if(infos.admin){
            return Component
        }
        return errorComponent
    }
    return errorComponent

}