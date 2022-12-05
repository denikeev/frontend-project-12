import React, { useEffect, useRef } from 'react';

const MessagesBox = ({ messages }) => {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.focus();
  });

  return (
    <div className="overflow-auto px-5">
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
