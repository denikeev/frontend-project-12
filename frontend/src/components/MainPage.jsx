import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/authSlice.js';

import logo from '../logo.svg';
import '../App.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    loggedIn
      ? <Button onClick={() => dispatch(logOut())}>Log out</Button>
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
