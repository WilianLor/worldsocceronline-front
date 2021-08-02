import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../../styles/colors";

export const Body = styled.div`
  flex: 1;
`;

export const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
`;

export const NextGame = styled(Link)`
  height: 33vh;
  width: 100%;
  border-radius: 8px;
  background-color: ${colors.dark};
  text-decoration: none;
  border: 2px solid ${colors.dark};
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover {
    border: 2px solid ${colors.green};
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  width: 100%;
`;

export const Option = styled(Link)`
  background-color: ${colors.dark};
  width: 22vw;
  height: 35vh;
  border-radius: 8px;
  text-decoration: none;
  border: 2px solid ${colors.dark};
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover {
    border: 2px solid ${colors.green};
  }
`;
