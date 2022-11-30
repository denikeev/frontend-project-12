import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/authSlice.js';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    loggedIn
      ? <Button onClick={() => dispatch(logOut())}>Выйти</Button>
      : null
  );
};

const Header = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      <LogoutButton />
    </Container>
  </Navbar>
);

export default Header;
