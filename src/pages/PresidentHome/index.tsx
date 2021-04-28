import Navbar from '../../components/Navbar'

import { 
  Body, 
  HomePage
} from './styles'

const homePresident: React.FC = () => {
  return (
    <Body>
      <Navbar />
      <HomePage>
        president
      </HomePage>
    </Body>
  )
}

export default homePresident;