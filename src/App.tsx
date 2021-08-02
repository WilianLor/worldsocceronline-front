import UserContextProvider from "./contexts/UserContext"

import "./styles/global.css";

import Routes from "./routes";

const App = () => {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
};

export default App;
