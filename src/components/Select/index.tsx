import {
    FieldSelect,
    SvgSelect,
    Select,
    Option
} from './styles'

import FlagIcon from '@material-ui/icons/Flag'
import colors from '../../styles/colors';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
    placeholder: string
}

const SelectComponent = ({ placeholder, children, ...rest}: SelectProps) => {
    return (
        <FieldSelect className="select" id="country">
            <SvgSelect>
                <FlagIcon style={{color: colors.green}}/>
            </SvgSelect>
            <Select {...rest}>
                <Option value="">{ placeholder }</Option>
                {children}
            </Select>
        </FieldSelect>
    )
}

export default SelectComponent