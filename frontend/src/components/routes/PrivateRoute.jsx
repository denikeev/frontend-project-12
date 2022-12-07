import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import urls from '../../urls.js';

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    loggedIn ? children : <Navigate to={urls.login} />
  );
};

export default PrivateRoute;
