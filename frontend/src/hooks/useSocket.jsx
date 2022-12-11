import { useContext } from 'react';
import EntityContext from '../EntityContext.js';

const useSocket = () => {
  const { socket } = useContext(EntityContext);
  return socket;
};

export default useSocket;
