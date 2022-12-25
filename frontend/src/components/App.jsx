import React, { useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import EntityContext from '../EntityContext.js';
import {
  ChatPage,
  LoginPage,
  SignUpPage,
  NoMatchPage,
  PrivateRoute,
} from './routes/reactRouters.js';
import Header from './layouts/Header.jsx';
import urls from '../urls.js';
import notify from '../notify.js';

const App = () => {
  const { socket } = useContext(EntityContext);
  const { t } = useTranslation('translation');

  useEffect(() => {
    socket.on('disconnect', (reason) => {
      if (reason === 'transport error') {
        notify('warn', t('notifications.networkWarn'), { autoClose: 7000 });
      }
    });
  }, [socket, t]);

  return (
    <>
      <Router>
        <div className="d-flex flex-column h-100">
          <Header />
          <Routes>
            <Route
              path={urls.root}
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path={urls.login} element={<LoginPage />} />
            <Route path={urls.signup} element={<SignUpPage />} />
            <Route path={urls.noMatch} element={<NoMatchPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
