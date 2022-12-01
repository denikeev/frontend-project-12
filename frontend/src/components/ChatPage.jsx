import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import ChannelsLayout from './ChannelsLayout.jsx';
import MessageForm from './MessageForm.jsx';
import MessagesBox from './MessagesBox.jsx';
import {
  fetchChannels,
  addChannel,
  setCurrentChannel,
  deleteChannel,
  renameChannel,
} from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice';
import getModal from './modals/index.js';
import Header from './Header.jsx';

const socket = io();

const renderModal = (modalInfo, hideModal, socketInstance) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return (
    <Component
      modalInfo={modalInfo}
      onHide={hideModal}
      socket={socketInstance}
      channel={modalInfo.channel}
    />
  );
};

const ChatPage = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalInfo({ type, channel });
  const dispatch = useDispatch();
  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = entities[currentChannelId];

  useEffect(() => {
    dispatch(fetchChannels());
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      dispatch(setCurrentChannel(payload.id));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(deleteChannel(payload.id));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel({ id: payload.id, changes: payload }));
    });
  }, []);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <ChannelsLayout
              currentChannelId={currentChannelId}
              showModal={showModal}
              socket={socket}
            />
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
      {renderModal(modalInfo, hideModal, socket)}
    </>
  );
};

export default ChatPage;
