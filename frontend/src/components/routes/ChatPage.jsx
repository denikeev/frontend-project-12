import React, { useEffect } from 'react';
import { useRollbar } from '@rollbar/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import notify from '../../notify.js';
import useAuth from '../../hooks/useAuth.jsx';
import getModal from '../modals/index.js';
import ChannelsLayout from '../ChannelsLayout.jsx';
import MessageForm from '../MessageForm.jsx';
import MessagesBox from '../MessagesBox.jsx';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { messagesSelector } from '../../slices/messagesSlice.js';

const renderModal = (modalState) => {
  if (!modalState.type) {
    return null;
  }
  const Component = getModal(modalState.type);
  return <Component />;
};

const ChatPage = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const auth = useAuth();
  const rollbar = useRollbar();

  const allMessages = useSelector(messagesSelector.selectAll);
  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const modalState = useSelector((state) => state.modalState);
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);
  const currentChannel = entities[currentChannelId];

  useEffect(() => {
    dispatch(fetchChannels())
      .unwrap()
      .catch((err) => {
        if (err.error === 'Unauthorized') {
          notify('err', t('notifications.authorizationErr'), { autoClose: 3000 });
          setTimeout(() => {
            auth.logOut();
          }, 4000);
        } else {
          rollbar.error('unknown auth error', err);
        }
      });
  }, [dispatch, t, rollbar]);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelsLayout
            currentChannelId={currentChannelId}
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
                <MessageForm currentChannelId={currentChannelId} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {renderModal(modalState)}
    </>
  );
};

export default ChatPage;
