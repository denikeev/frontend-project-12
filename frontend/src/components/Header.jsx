import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logOut } from '../slices/authSlice.js';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const { t } = useTranslation('translation');

  return (
    loggedIn
      ? <Button onClick={() => dispatch(logOut())}>{t('header.logout')}</Button>
      : null
  );
};

const Header = () => {
  const { t } = useTranslation('translation');

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('header.logotype')}</Navbar.Brand>
        <LogoutButton />
      </Container>
    </Navbar>
  );
};

export default Header;
