import Navbar from '../../components/Navbar'
import { 
  Body, 
  HomePage, 
  NextGame, 
  Options, 
  Option 
} from './styles'

import colors from '../../styles/colors'

const homeCoach: React.FC = () => {

  document.title = 'WSO | Home'
  document.body.style.background = colors.black
  return (
    <Body>
      <Navbar />
      <HomePage>
        <NextGame>
        </NextGame>
        <Options>
          <Option />
          <Option />
          <Option />
        </Options>
      </HomePage>
    </Body>
  );
}

export default homeCoach;
