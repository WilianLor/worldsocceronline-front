import styled from 'styled-components'

import DownArrow from '../../images/arrowDown.png'

import colors from '../../styles/colors'

export const Body = styled.div`
    display: flex;
    flex-direction: column;
`

export const FindCoachPage = styled.div`
    margin-top: 5vh;
    margin-left: 2vw;
    margin-right: 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    justify-content: space-between;
    height: auto;
`

export const Header = styled.div`
    height: auto;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.green};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const PageContent = styled.div`
    height: 2rem;
    width: 100%;
    margin-bottom: -1rem;
`

export const PageButton = styled.button`
    height: 2rem;
    width: 2rem;
    margin-left: .5rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
    border-radius: .5rem;
    cursor: pointer;
    transition: .4s ease 0s;

    &#active {
        background-color: ${colors.black};
    }

    &:hover {
        background-color: ${colors.black};
    }
`

export const HeaderTitle = styled.h1`
    margin-bottom: 0.625rem;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-top: 1.25rem;
`

export const HeaderText = styled.p`
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 1.25rem;
`

export const ListOfCoaches = styled.div`
    min-height: 48vh;
    width: 100%;
    border-radius: .25rem;
    background-color: ${colors.dark};
    color: ${colors.lightGray};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`

export const Coach = styled.a`
    width: 11rem;
    height: 22vh;
    text-decoration: none;
    border-radius: .5rem;
    color: ${colors.lightGray};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-bottom: .125rem solid ${colors.black};
    background-color: transparent;
    margin-bottom: 1rem;
    transition: .4s ease 0s;

    &:hover {
        background-color: ${colors.black};
    }
`

export const Username = styled.h3`
    font-size: 1.25rem;
    color: ${colors.lightGray};
    margin-top: 1rem;
`

export const ContentText = styled.h3`
    font-size: 1rem;
    color: ${colors.green};
`

export const Flag = styled.img`
    height: 3rem;
`

export const FilterContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1154px) {
        flex-direction: column;
        justfy-content: center;
    }
`

export const CheckBoxField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.lightGray};
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;
    justify-content: center;
    color: gray;
`   

export const CheckBox = styled.input`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .5rem;
    border: .125rem solid ${colors.lightGray};

    &:checked {
        background-color: ${colors.green};
    }
`
export const CheckBoxLabel = styled.label`
    font-size: 1rem;
`

export const SelectField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${colors.lightGray} url(${DownArrow}) 95.5% 50% no-repeat;
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;
`

export const SvgSelect = styled.div`
    margin-left: 1rem;
`

export const Select = styled.select`
    background: none;
    height: 3.375rem;
    width: 21.9375rem;
    font-size: 1rem;
    font: 400 Arial;
    color: gray;
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: .625rem;
    position: absolute;
    border-radius: .3125rem;
    border: .125rem solid ${colors.green};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &#Invalid {
        border: .125rem solid ${colors.red};
    }

    &:focus {
        border: .125rem solid  ${colors.lightGray};
    }

    &:required:invalid {
        color: gray;
    }
`

export const Option = styled.option`
    
    color: gray;
    font-size: 1rem;
    background-color: #${colors.lightGray};
    line-height: 12.5rem;

    &:hover {
        background-color: ${colors.green};
    }

    &[value=""][disabled] {
        display: none;
    }
      
`

export const InputField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.lightGray};
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;
`

export const Svg = styled.div`
    margin-left: 1.25rem;
`

export const Input = styled.input`
    background: none;
    height: 3.125rem;
    width: 17.9375rem;
    font-size: 1rem;
    color: gray;
    font: 400 Arial;
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: 0.625rem;
    position: absolute;
    border-radius: 0.3125rem;
    border: 0.125rem solid ${colors.green};

    &#Invalid {
        border: 0.125rem solid ${colors.red};
    }

    &:-ms-input-placeholder {  
        color: ${colors.dark};  
    }

    &:focus {
        border: 0.125rem solid  ${colors.lightGray};
    }
`