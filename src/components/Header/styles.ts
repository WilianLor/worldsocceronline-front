import styled from "styled-components";

import colors from "../../styles/colors";

export const HeaderContainer = styled.div`
  height: auto;
  width: 100%;
  border-radius: 0.25rem;
  background-color: ${colors.green};
  color: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const HeaderTitle = styled.h1`
  margin-bottom: 0.625rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  margin-top: 1.25rem;
`;

export const HeaderText = styled.p`
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  margin-bottom: 1.25rem;
`;
