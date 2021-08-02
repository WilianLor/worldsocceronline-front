import styled from "styled-components";

import colors from "../../styles/colors";

export const Notification = styled.div`
  width: 21.875rem;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3125rem;
  margin: 0.625rem;
  background-color: ${colors.dark};
  border-radius: 0.25rem;
`;
export const NotificationContent = styled.div`
  height: 5.625rem;
  display: flex;
  flex-direction: column;
  margin-left: 0.625rem;
`;

export const NotificationTitle = styled.h1`
  font-size: 1.0625rem;
  margin-bottom: 0.9375rem;
  color: ${colors.lightGray};
  font-weight: 400;
`;
export const NotificationText = styled.p`
  font-size: 0.9375rem;
  font-weight: 300;
`;

export const DeleteNotification = styled.button`
  height: 0.875rem;
  width: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
`;

export const ButtonSvg = styled.svg`
  width: 9.375rem;
  fill: ${(props) => props.colorInterpolation};
`;
