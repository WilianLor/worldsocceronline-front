import styled from 'styled-components'

import colors from '../../styles/colors'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProfilePage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;

  @media (max-width: 720px) {
    & {
      flex-direction: column;
    }
  }
`

export const Warning = styled.div`
  width: 96vw;
  height: 80vh;
  background-color: ${colors.dark};
  border-radius: .25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 720px) {
    & {
      width: 100%;
      height: 30rem;
      margin-bottom: 1rem;
    }
  }
`

export const PlayerData = styled.div`
  width: 31.5vw;
  height: 80vh;
  background-color: ${colors.dark};
  border-radius: .25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 720px) {
    & {
      width: 100%;
      height: 30rem;
      margin-bottom: 1rem;
    }
  }
`

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Username = styled.h3`
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: ${colors.lightGray};
`

export const Subtitle = styled.div`
  color: ${colors.green};
  font-size: .75rem;
  margin-top: .25rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

export const Country = styled.div`
  display: flex;
  flex-direction: column;
  justfy-content: center;
  align-items: center;
`

export const CountryImage = styled.img`
  width: 7rem;
  margin-top: 3rem;
  border-radius: .5rem;
`

export const DescriptionContainer = styled.div`
  width: 80%;
`

export const DescriptionText = styled.p`
  height: 9rem;
  color: ${colors.lightGray};
  width: 100%;
  text-align: center;
`

export const DescriptionEdit = styled.textarea`
  resize: none;
  height: 9rem;
  color: ${colors.lightGray};
  background: none;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  border: none;
  overflow-x: hidden;
  overflow-y: hidden;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const DescriptionButton = styled.button`
  background: none;
  cursor: pointer;
`

export const Button = styled.button`
  color: ${colors.lightGray};
  background-color: ${colors.green};
  padding: 0.625rem;
  border-radius: .5rem;
  font-size: .9375rem;
  font-weight: 600;
  transition: .4s;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
      background-color: ${colors.lightGreen};
  }
`

export const ActiveContract = styled.div`
  width: 28vw;
  height: 80vh;
  background-color: ${colors.dark};
  border-radius: .25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 720px) {
    & {
      width: 100%;
      height: 30rem;
      margin-bottom: 1rem;
    }
  }
`

export const TeamName = styled.h3`
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: ${colors.lightGray};
`

export const TeamActive = styled.img`
  padding: .8rem;
  background-color: ${colors.black};
  border-radius: .5rem;
  width: 7rem;
  margin-top: 3rem;
`

export const TeamImage = styled.img`
  padding: .3rem;
  background-color: ${colors.black};
  border-radius: .5rem;
  height: 5rem;
  margin-left: 1rem;
`

export const InfoName = styled.h2`
  color: ${colors.lightGray};
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
`

export const InfoContainer = styled.div`
  width: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CarrerContainer = styled.div`
  width: 34.5vw;
  height: 80vh;
  background-color: ${colors.dark};
  border-radius: .25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

    ::-webkit-scrollbar-track {
        background-color: ${colors.black};
    }
    ::-webkit-scrollbar {
        width: .25rem;
        background: ${colors.lightGray};
    }
    ::-webkit-scrollbar-thumb {
        background: ${colors.green};
        border-radius: .25rem;
    }

  @media (max-width: 720px) {
    & {
      width: 100%;
      height: 30rem;
      margin-bottom: 1rem;
    }
  }
`

export const Career = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 7rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
`

export const Alert = styled.div`
  width: 75%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

