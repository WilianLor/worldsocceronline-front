import styled from 'styled-components'
import colors from '../../styles/colors'

export const LargeButton = styled.button`
    width: 21.875rem;
    height: 3.125rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${colors.green};
    border-radius: 0.3125rem;
    color: ${colors.lightGray};
    cursor: pointer;
    margin-top: 1.875rem;
    transition: .4s ease 0s;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }

    &:hover{
        background-color: ${colors.lightGreen};
    }
`

export const SmallButton = styled.button`
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