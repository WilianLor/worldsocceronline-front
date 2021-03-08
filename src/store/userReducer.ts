import { Action } from "./actions"

export interface UserState {
    isLogged: boolean,
    token: string,
    profession: string, 
    user: {
        userId: string,
        professionId: string, 
        username: string,
        country: string,
        teamId: string,
        admin: boolean,
        passwordVersion: number,
    }
}

const initialState = {
    isLogged: false,
    token: "",
    profession: "", 
    user: {
        userId: "",
        professionId: "", 
        username: "",
        country: "",
        teamId: "",
        admin: false,
        passwordVersion: 0,
    }
}

export const userReducer = (state:UserState = initialState, action: Action) => {
        switch(action.type) {
            case "LOGIN": {
                return {
                    ...state,
                    isLogged: true,
                    token: action.payload.token,
                    profession: action.payload.profession,
                    user: action.payload.user
                }
            }
            case "LOGOUT": {
                return {
                    ...state,
                    isLogged: false,
                    token: action.payload.token,
                    profession: action.payload.profession,
                    user: action.payload.user,
                }
            }
            case "VALIDATE": {
                return {
                    ...state,
                    isLogged: state.isLogged,
                    token: state.token,
                    profession: action.payload.profession,
                    user: {
                        teamId: action.payload.user.teamId,
                        userId: state.user.userId,
                        professionId: state.user.professionId, 
                        username: state.user.username,
                        country: state.user.country,
                        admin: state.user.admin,
                        passwordVersion: state.user.passwordVersion
                    }
                }
            }
            default:
                return state
        }
}

