import { HeaderContainer, HeaderText, HeaderTitle } from "./styles";

import { HeaderProps } from "./types";

const Header = ({ children, title, text }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderText>{text}</HeaderText>
      {children}
    </HeaderContainer>
  );
};

export default Header
