import Lottie from "react-lottie";
import animationData from "../../images/load.json"
import colors from "../../styles/colors";
import { LoadComponent } from "./styles";

const LoadingComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  document.body.style.backgroundColor = colors.black

  return (
    <LoadComponent>
      <Lottie options={defaultOptions} width={'10rem'} height={'10rem'}/>
    </LoadComponent>
  );
};

export default LoadingComponent;
