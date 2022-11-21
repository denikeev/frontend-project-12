import { Button } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

import logo from '../logo.svg';
import '../App.css';

const LogoutButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const MainPage = () => (
  <div className="App">
    <LogoutButton />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>src/App.js</code>
        and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default MainPage;
