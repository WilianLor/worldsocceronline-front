import { createContext, ReactNode, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../config/api.json";

export interface UserState {
  isLogged: boolean;
  token: string;
  profession: string;
  user: {
    userId: string;
    professionId: string;
    username: string;
    country: string;
    teamId: string;
    admin: boolean;
    passwordVersion: number;
  };
}

interface DataContextType {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  logout: () => void;
}

interface Props {
  children: ReactNode;
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
  },
};

export const UserContext = createContext({} as DataContextType);

const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<UserState>(initialState);

  useEffect(() => {
    if (!user.isLogged) {
      const token = localStorage.getItem("WSO_USER_TOKEN");

      const header = {
        headers: { authorization: "Bearer " + token },
      };

      if (token) {
        axios
          .get(config.baseUrl + "/getuser", header)
          .then((response: AxiosResponse) => {
            if (response.status === 200) {
              const userData = {
                isLogged: true,
                token: response.data.token,
                profession: response.data.profession,
                user: response.data.user,
              };
              setUser(userData);
            }
          });
      }
    }
  }, [user]);

  const logout = () => {
    setUser(initialState);
    localStorage.removeItem("WSO_USER_TOKEN");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
