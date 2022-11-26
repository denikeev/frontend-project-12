import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ChannelsLayout from './ChannelsLayout.jsx';
import MessageForm from './MessageForm.jsx';
import MessagesBox from './MessagesBox.jsx';
import { logOut } from '../slices/authSlice.js';
import { fetchChannels } from '../slices/channelsSlice.js';

// import logo from '../logo.svg'; // delete
// import '../App.css'; // delete

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
  const dispatch = useDispatch();
  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = entities[currentChannelId];

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <LogoutButton />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelsLayout currentChannelId={currentChannelId} />
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                {currentChannel?.name}
              </div>
              <MessagesBox currentChannelId={currentChannelId} />
              <div className="mt-auto px-5 py-3">
                <MessageForm currentChannelId={currentChannelId} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatPage;
