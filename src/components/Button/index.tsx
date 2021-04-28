import { 
    LargeButton, 
    SmallButton 
} from './styles'

import CircularProgress from '@material-ui/core/CircularProgress';

import colors from '../../styles/colors';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    title: string,
    loading?: boolean,
    size?: string
}

const Button = ({title, size, loading, ...rest}: ButtonProps) => {
    if(size === 'large'){
        return <LargeButton {...rest}>{loading ? <CircularProgress style={{color: colors.white, width: '1.5rem', height: '1.5rem'}}/>:title}</LargeButton>
    }else {
        return <SmallButton {...rest}>{loading ? <CircularProgress style={{color: colors.white, width: '1.5rem', height: '1.5rem'}}/>:title}</SmallButton>
    }
}

export default Button