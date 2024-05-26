import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onLoginClicked,
  onSignUpClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onLoginClicked}>Log in</Button>
      <Button onClick={onSignUpClicked}>Sign up</Button>
    </>
  );
};

export default NavBarLoggedOutView;
