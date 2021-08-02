import { LargeButton, SmallButton } from "./styles";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  title: string;
  size?: string;
}

const Button = ({ title, size, ...rest }: ButtonProps) => {
  if (size === "large") {
    return <LargeButton {...rest}>{title}</LargeButton>;
  } else {
    return <SmallButton {...rest}>{title}</SmallButton>;
  }
};

export default Button;
