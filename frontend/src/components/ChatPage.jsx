import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import notify from '../notify.js';
import ChannelsLayout from './ChannelsLayout.jsx';
import MessageForm from './MessageForm.jsx';
import MessagesBox from './MessagesBox.jsx';
import { addMessage, messagesSelector } from '../slices/messagesSlice.js';
import {
  fetchChannels,
  addChannel,
  deleteChannel,
  renameChannel,
} from '../slices/channelsSlice.js';
import getModal from './modals/index.js';

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
  const { t } = useTranslation('translation');
  filter.loadDictionary('ru');
  const allMessages = useSelector(messagesSelector.selectAll);

  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = entities[currentChannelId];
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    dispatch(fetchChannels());
    socket.on('newMessage', (payload) => {
      const filteredText = filter.clean(payload.body);
      dispatch(addMessage({ ...payload, body: filteredText }));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(deleteChannel(payload.id));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel({ id: payload.id, changes: payload }));
    });
    socket.on('disconnect', (reason) => {
      if (reason === 'transport error' || reason === 'transport close') {
        notify('warn', t('notifications.networkWarn'), { autoClose: 7000 });
      }
    });
  }, [dispatch, t]);

  return (
    <>
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
                <p className="m-0">
                  <b>{`# ${currentChannel?.name}`}</b>
                </p>
                <span className="text-muted">{t('messagesCount.count', { count: messages.length })}</span>
              </div>
              <MessagesBox messages={messages} />
              <div className="mt-auto px-2 px-sm-3 px-md-5 py-3">
                <MessageForm currentChannelId={currentChannelId} socket={socket} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {renderModal(modalInfo, hideModal, socket)}
    </>
  );
};

export default ChatPage;
