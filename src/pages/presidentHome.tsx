import React from 'react';
import styled from 'styled-components'

import Navbar from '../components/navbar'

const homePresident: React.FC = () => {
  return (
    <Body>
      <Navbar />
      <HomePage>
        president
      </HomePage>
    </Body>
  )
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
`

const HomePage = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5vh;
    margin-left: 2vw;
    margin-right: 2vw;
`

export default homePresident;