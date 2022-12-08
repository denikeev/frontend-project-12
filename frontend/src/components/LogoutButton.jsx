import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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

export default LogoutButton;
