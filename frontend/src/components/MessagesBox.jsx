import React, { useEffect } from 'react';
import { Element, scroller } from 'react-scroll';

const MessagesBox = ({ messages }) => {
  useEffect(() => {
    scroller.scrollTo('scrollToElement', { containerId: 'messagesBox' });
  });

  return (
    <div className="overflow-auto px-5" id="messagesBox">
      {messages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          {`: ${message.body}`}
        </div>
      ))}

      <Element name="scrollToElement" />
    </div>
  );
};

export default MessagesBox;
