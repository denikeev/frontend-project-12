import { useSelector } from 'react-redux';
import { messagesSelector } from '../slices/messagesSlice.js';

const MessagesBox = ({ currentChannelId }) => {
  const allMessages = useSelector(messagesSelector.selectAll);
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  return (
    <div id="messages-box" className="overflow-auto px-5 ">
      {messages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          {`: ${message.body}`}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
