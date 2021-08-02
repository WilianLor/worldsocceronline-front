import styled from "styled-components";
import colors from "../../styles/colors";

export const Divider = styled.div`
  width: 90%;
  margin-right: 5%;
  margin-left: 5%;
  height: 1px;
  border-radius: 2px;
`;

export const NameContainer = styled.div`
  height: 4rem;
  width: 80%;
  margin-left: 5%;
  border-radius: .4rem;
  background-color: ${colors.green};
  margin-top: .5rem;
  margin-bottom: .5rem;
  padding-left: 5%;
  padding-right: 5%;  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h2`
  font-size: 1.5rem;
  color: ${colors.white};
  font-weight: 600;
`

export const ButtonSvg = styled.svg`
  width: 9.375rem;
  fill: ${(props) => props.colorInterpolation};
`;

export const Avatar = styled.span`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: ${colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FirstLetter = styled.h2`
  font-size: 1.5rem;
  color: ${colors.white};
`

export const ListContainer = styled.div`
  width: 25rem;
  background-color: ${colors.dark};
  height: 100vh;
`
