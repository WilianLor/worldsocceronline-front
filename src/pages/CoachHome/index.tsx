import { Body, HomePage, NextGame, Options, Option } from "./styles";
import React from "react";
import colors from "../../styles/colors";

const CoachHome: React.FC = () => {
  document.title = "WSO | Home";
  document.body.style.background = colors.black;
  return (
    <Body>
      <HomePage>
        <NextGame to="#"></NextGame>
        <Options>
          <Option to="#"></Option>
          <Option to="#"></Option>
          <Option to="#"></Option>
          <Option to="#"></Option>
        </Options>
      </HomePage>
    </Body>
  );
};

export default CoachHome;
