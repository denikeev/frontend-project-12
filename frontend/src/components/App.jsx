import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import '../i18n';
import { ToastContainer } from 'react-toastify';

import RollbarProvider from './RollbarProvider.jsx';
import {
  ChatPage,
  LoginPage,
  SignUpPage,
  NoMatchPage,
  PrivateRoute,
} from './routes/reactRouters.js';
import Header from './layouts/Header.jsx';
import urls from '../urls.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => (
  <RollbarProvider>
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
  </RollbarProvider>
);

export default App;
