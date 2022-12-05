import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import '../i18n';
import { useSelector } from 'react-redux';
import { Provider } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';

import Header from './Header.jsx';
import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';

import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Provider config={rollbarConfig}>
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </Provider>
);

export default App;
