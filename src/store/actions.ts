export interface Payload {
    token: string,
    profession: string,
    user: {
        userId: string,
        professionId: string,
        username: string,
        country: string,
        teamId: string,
        admin: boolean
        passwordVersion: number,
    }
}

interface validatePayload {
    profession: string,
    teamId: string
}

export type Action = {type: "LOGIN" | "LOGOUT" | "VALIDATE", payload: Payload }

export const login = (Payload: Payload): Action => ({
    type: "LOGIN",
    payload: Payload
})
     
export const logout = (): Action => ({
    type: "LOGOUT",
    payload: {
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
}})

export const validateAction = (Payload: validatePayload): Action => ({
    type: "VALIDATE",
    payload: {
    token: "", 
    profession: Payload.profession, 
    user: {
        userId: "", 
        professionId: "", 
        username: "", 
        country: "", 
        teamId: Payload.teamId, 
        admin: false,
        passwordVersion: 0,
    }
}})
