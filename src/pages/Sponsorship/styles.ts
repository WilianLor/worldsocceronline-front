import styled from "styled-components";

import colors from "../../styles/colors";

export const Body = styled.div`
  flex: 1;
`;

export const SponsorshipPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
`;

export const SponsorshipMainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
`;

export const Subtitle = styled.div`
  color: ${colors.green};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const SponsorshipOption = styled.div`
  width: 100%;
  height: 24rem;
  border-radius: .5rem;
  background-color: ${colors.dark};
  transition: 0.2s ease-in;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  border: 2px solid ${colors.dark};

  &.option {
    padding-bottom: 1rem;
    cursor: pointer;
    width: 20rem;
    height: 22rem;

    &:hover {
      border: 2px solid ${colors.green};
    }
  }
`

export const SponsorshipImage = styled.img`
  height: 6rem;
  padding: 0.5rem;
  border-radius: .5rem;
`

export const DescriptionText = styled.p`
  color: ${colors.lightGray};
  width: 100%;
  text-align: center;
  width: 80%;
`;

export const SponsorshipName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.lightGray}
`

export const HighlightText = styled.strong`
  color: ${colors.green};
`
