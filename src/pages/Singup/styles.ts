import styled from 'styled-components'
import colors from '../../styles/colors'

export const ErrorMessage = styled.p`
    color: ${colors.red};
    height: 1.875rem;
    width: 100%;
`


export const RegisterPage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 2.5rem;

    @media (max-width: 720px) {
        & {
            flex-direction: column-reverse;
        }
    }
`

export const FormRegister = styled.div`
    background-color: ${colors.dark};
    width: 21.875rem;
    height: auto;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border-radius: 0.3125rem;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }
`

export const FormTitle = styled.h1`
    color: ${colors.lightGray};
    font-size: 1.5625rem;
    margin-bottom: 0.625rem;
`

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 21.875rem;
    height: auto;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
    }
`

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
        border: 0.125rem solid  ${colors.green};
    }
`

export const Option = styled.option`
    
    color: ${colors.lightGray};
    font-size: 1rem;
    background-color: ${colors.black};
    line-height: 12.5rem;

    &:hover {
        background-color: ${colors.dark};
    }

    &[value=""][disabled] {
        display: none;
    }
      
`

export const Link = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: .875rem;
    font-weight: 600;
    color: ${colors.green};
    transition: .2s ease 0s;

    @media (max-width: 720px) {
        & {
            margin-bottom: 2rem;
        }
    }

    &:hover {
        color: ${colors.lightGreen};
    }
`

export const LinkSvg = styled.div`
    margin-right: 0.625rem;
`

export const LinkToHome = styled.a`
    text-decoration: none;
`

export const Image = styled.img`
    width: ${props => props.width}
`

export const RegisterContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 6.25rem;

    @media (max-width: 720px) {
        & {
            margin: 0;
            align-items: center;
        }
    }
`

export const ContentTitle = styled.h1`
    color: ${colors.lightGray};
    font-size: 2.25rem;
    font-weight: 600;
    width: 15.625rem;
    margin-bottom: 3.125rem;

    @media (max-width: 720px) {
        & {
            text-align: center;
        }
    }
`

export const ContentText = styled.p`
    color: ${colors.lightGray};
    font-size: 1rem;
    font-weight: 500;
    width: 21.875rem;
    margin-bottom: 3.125rem;
    
    @media (max-width: 720px) {
        & {
            text-align: center;
        }
    }
`