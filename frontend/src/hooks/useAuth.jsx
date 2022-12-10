import { useContext } from 'react';
import EntityContext from '../EntityContext.js';

const useAuth = () => {
  const { loggedIn, logIn, logOut } = useContext(EntityContext);
  return { loggedIn, logIn, logOut };
};

export default useAuth;
