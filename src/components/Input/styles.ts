import styled from "styled-components";
import colors from "../../styles/colors";

export const Fields = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.black};
  height: 3.125rem;
  width: 21.875rem;
  border-radius: 0.3125rem;
  margin-bottom: 0.9375rem;

  @media (max-width: 720px) {
    & {
      width: 18.875rem;
    }
  }
`;

export const Input = styled.input`
  background: none;
  height: 3.125rem;
  width: 17.9375rem;
  font-size: 1rem;
  color: ${colors.lightGray};
  font: 400 Arial;
  transition: border 0.2s ease 0s;
  padding-left: 3.125rem;
  padding-right: 0.625rem;
  position: absolute;
  border-radius: 0.3125rem;
  border: 0.125rem solid ${colors.dark};

  @media (max-width: 720px) {
    & {
      width: 14.9375rem;
    }
  }

  &#Invalid {
    border: 0.125rem solid ${colors.red};
  }

  &:-ms-input-placeholder {
    color: ${colors.dark};
  }

  &:focus {
    border: 0.125rem solid ${colors.green};
  }
`;

export const Svg = styled.div`
  margin-left: 1.25rem;
`;
