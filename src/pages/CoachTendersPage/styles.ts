import styled from 'styled-components'

import colors from '../../styles/colors'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`

export const NegociationPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;

  @media (max-width: 720px) {
    & {
      flex-direction: column-reverse;
    }
  }
`

export const TendersContainer = styled.div`
  height: auto;
  width: 24rem;
  background-color: ${colors.dark};
  border-radius: .5rem;

  @media (max-width: 720px) {
    & {
      width: 90vw;
      margin-bottom: 1rem;
    }
  }
`

export const TerminationFine = styled.p`
  font-size: .9rem;
  margin-top: .25rem;
  text-align: center;
  margin-top: 2rem;
  width: 70%;
`

export const TabContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: ${colors.black};
`

export const ConditionsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 3rem;
`

export const Alert = styled.h2`
  text-align: center;
  font-size: 1rem;
  width: 50%;
  font-weight: 500;
`

export const ActionsButtons = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 15vh;

  @media (max-width: 720px) {
    & {
      width: 90vw;
      height: auto;
      flex-wrap: wrap;
      margin-bottom: 1rem
    }
  }
`

export const Tab = styled.button`
  width: 100%;
  border-radius: .5rem .5rem 0 0;
  height: 3rem;
  background-color: ${colors.dark};
  border-bottom: .125rem solid ${colors.green};
  color: ${colors.green};
  font-size: .9375rem;
  font-weight: 600;
`

export const List = styled.div`
  height: 72vh !important;
  width: 100%;
  overflow-y: scroll;

    ::-webkit-scrollbar-track {
        background-color: ${colors.dark};
    }
    ::-webkit-scrollbar {
        width: .25rem;
        background: ${colors.lightGray};
    }
    ::-webkit-scrollbar-thumb {
        background: ${colors.green};
        border-radius: .25rem;
    }
`

export const Tender = styled.button`
  border-bottom: .125rem solid ${colors.black};
  margin-left: 5%;
  height: 5rem;
  width: 90%;
  background: none;
  border-radius: .5rem;
  transition: .4s;
  margin-bottom: .5rem;
  margin-top: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  &:hover {
    background: ${colors.black};
  }

  &#active {
    background: ${colors.black};
  }
`

export const Name = styled.h2`
  color: ${colors.lightGray};
  font-size: 1rem;
`

export const Status = styled.h3`
  font-size: .75rem;
  color: ${colors.red};

  &#sended {
    color: ${colors.green};
  }

`

export const Contract = styled.div`
  height: 65vh;
  width: 45vw;
  background-color: ${colors.lightGray};
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  @media (max-width: 720px) {
    & {
      width: 90vw;
      height: 65vh;
    }
  }
`

export const ContractCoach = styled.div`
  width: 72vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
`

export const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;

    @media (max-width: 720px) {
      & {
        margin-bottom: 3rem;
      }
    }
`

export const Title = styled.h2`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
`

export const EditInput = styled.input`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  border: none;
  background-color: ${colors.lightGray};
  color: ${colors.black};
  width: 8rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type=number] {
      -moz-appearance:textfield;
  }
`

export const EditTextArea = styled.textarea`
  text-align: center;
  font-size: 1.125rem;
  border: none;
  overflow-x: hidden;
  overflow-y: hidden;
  font-weight: 500;
  background-color: ${colors.lightGray};
  width: 80%;
  resize: none;
`

export const SubTitle = styled.h3`
  font-size: .75rem;
  margin-top: .25rem;
  text-align: center;

  &#error {
    color: ${colors.red};
  }
` 

export const ContractPlan = styled.h2`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  width: 80%;
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
  min-width: 10rem;

  &:hover {
      background-color: ${colors.lightGreen};
  }
`



