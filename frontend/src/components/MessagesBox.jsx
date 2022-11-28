import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../slices/messagesSlice.js';

const MessagesBox = ({ currentChannelId }) => {
  const allMessages = useSelector(messagesSelector.selectAll);
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  const divRef = useRef();
  useEffect(() => {
    divRef.current.focus();
  });

  return (
    <div id="messages-box" className="overflow-auto px-5">
      {messages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          {`: ${message.body}`}
        </div>
      ))}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div tabIndex="0" ref={divRef} />
    </div>
  );
};

export default MessagesBox;
