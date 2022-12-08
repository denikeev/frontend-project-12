import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import LogoutButton from '../LogoutButton.jsx';
import urls from '../../urls.js';

const Header = () => {
  const { t } = useTranslation('translation');

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={urls.root}>
          {t('header.logotype')}
        </Navbar.Brand>
        <LogoutButton />
      </Container>
    </Navbar>
  );
};

export default Header;
