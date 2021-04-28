import styled from 'styled-components'
import DownArrow from '../../images/arrowDown.png'
import colors from '../../styles/colors'

export const FieldSelect = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${colors.black} url(${DownArrow}) 95.5% 50% no-repeat;
    height: 3.125rem;
    width: 21.875rem;
    border-radius: 0.3125rem;
    margin-bottom: 0.9375rem;

    @media (max-width: 720px) {
        & {
            width: 18.875rem;
        }
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

export const SvgSelect = styled.div`
    margin-left: 1rem;
`

export const Select = styled.select`
    background: none;
    height: 3.375rem;
    width: 21.9375rem;
    font-size: 1rem;
    font: 400 Arial;
    color: ${colors.lightGray}; 
    transition: border 0.2s ease 0s;
    padding-left: 3.125rem;
    padding-right: .625rem;
    position: absolute;
    border-radius: .3125rem;
    border: .125rem solid ${colors.dark};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    @media (max-width: 720px) {
        & {
            width: 18.9375rem;
        }
    }

    &#Invalid {
        border: .125rem solid ${colors.red};
    }

    &:focus {
        border: .125rem solid  ${colors.green};
    }

    &:required:invalid {
        color: gray;
    }
`