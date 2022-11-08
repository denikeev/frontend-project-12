import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import '../i18n';

import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';

import '../index.css'; // check it
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  </Router>
);

export default App;
