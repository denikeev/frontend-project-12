import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.jsx';

const LogoutButton = () => {
  const auth = useAuth();
  const { t } = useTranslation('translation');

  return (
    auth.loggedIn
      ? <Button onClick={() => auth.logOut()}>{t('header.logout')}</Button>
      : null
  );
};

export default LogoutButton;
