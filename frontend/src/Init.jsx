import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.min.css';

import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import RollbarProvider from './components/RollbarProvider.jsx';
import EntityContext from './EntityContext.js';
import store from './slices/index.js';
import App from './components/App.jsx';
import './i18n.js';

import { addMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  deleteChannel,
  renameChannel,
} from './slices/channelsSlice.js';

const socket = io();

const subscribeToChannelEvents = () => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel({ id: payload.id, changes: payload }));
  });
};

subscribeToChannelEvents();

const Init = () => {
  // const getToken = () => JSON.parse(localStorage.getItem('userId')).token;
  const hasToken = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId && userId.token;
  };
  const [loggedIn, setLoggedIn] = useState(!!hasToken);
  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    localStorage.setItem('username', data.username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const entities = useMemo(() => ({
    socket,
    loggedIn,
    logIn,
    logOut,
  }), [loggedIn]);

  return (
    <Provider store={store}>
      <RollbarProvider>
        <EntityContext.Provider value={entities}>
          <App />
        </EntityContext.Provider>
      </RollbarProvider>
    </Provider>
  );
};

export default Init;
