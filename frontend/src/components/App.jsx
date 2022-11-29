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

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';

import '../index.css'; // check it
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Router>
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
  </Router>
);

export default App;
