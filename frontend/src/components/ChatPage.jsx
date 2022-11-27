import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import ChannelsLayout from './ChannelsLayout.jsx';
import MessageForm from './MessageForm.jsx';
import MessagesBox from './MessagesBox.jsx';
import { logOut } from '../slices/authSlice.js';
import { fetchChannels, addChannel, setCurrentChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice';
import getModal from './modals/index.js';
// import logo from '../logo.svg'; // delete
// import '../App.css'; // delete

const socket = io();

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) {
    return null;
  }
  console.log('modalInfo>>>', modalInfo);
  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} socket={socket} />;
};

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    loggedIn
      ? <Button onClick={() => dispatch(logOut())}>Log out</Button>
      : null
  );
};

const ChatPage = () => {
  const [modalInfo, setModalInfo] = useState({ type: null });
  const hideModal = () => setModalInfo({ type: null });
  const showModal = (type) => setModalInfo({ type });
  const dispatch = useDispatch();
  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = entities[currentChannelId];

  useEffect(() => {
    dispatch(fetchChannels());
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      console.log('newChannel>>>', payload); // { id: 6, name: "new channel", removable: true }
      dispatch(addChannel(payload));
      dispatch(setCurrentChannel(payload.id));
    });
  }, []);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <LogoutButton />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <ChannelsLayout currentChannelId={currentChannelId} showModal={showModal} />
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  {currentChannel?.name}
                </div>
                <MessagesBox currentChannelId={currentChannelId} />
                <div className="mt-auto px-5 py-3">
                  <MessageForm currentChannelId={currentChannelId} socket={socket} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/*  */}
      {renderModal(modalInfo, hideModal)}
    </>
  );
};

export default ChatPage;