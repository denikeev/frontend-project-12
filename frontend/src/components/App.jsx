import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  ChatPage,
  LoginPage,
  SignUpPage,
  NoMatchPage,
  PrivateRoute,
} from './routes/reactRouters.js';
import Header from './layouts/Header.jsx';
import urls from '../urls.js';

const App = () => (
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

export default App;
