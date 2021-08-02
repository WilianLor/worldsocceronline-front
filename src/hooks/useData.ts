import {useContext} from 'react'
import {UserContext} from '../contexts/UserContext'

const useData = () => {
    const value = useContext(UserContext)

    return value
}

export default useData