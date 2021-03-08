import React from 'react';
import styled from 'styled-components'

import Navbar from '../components/navbar'

const homeCoach: React.FC = () => {

  document.title = 'WSO | Home'
  document.body.style.background = "#121214"
  return (
    <Body>
      <Navbar />
      <HomePage>
        <NextGame>
        </NextGame>
        <Options>
          <Option />
          <Option />
          <Option />
        </Options>
      </HomePage>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
`

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
`

const NextGame = styled.a`
  height: 30vh;
  width: 100%;
  border-radius: 8px;
  background-color: #202024; 
  text-decoration: none;
  border: 2px solid #202024;
  transition: .4s ease-in;
  cursor: pointer;

  &:hover {
    border: 2px solid #04D361;
  }
`

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 50px;
  width: 100%;
`

const Option = styled.a `
    background-color: #202024;
    width: 20vw;
    height: 35vh;
    border-radius: 8px;
    text-decoration: none;
    border: 2px solid #202024;
    transition: .4s ease-in;
    cursor: pointer;

    &:hover {
      border: 2px solid #04D361;
    }
`

export default homeCoach;
