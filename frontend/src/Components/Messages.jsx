import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import MessageForm from './MessageForm';
import socket from '../utils/socket';
import { addMessage } from '../Slices/messagesSlice';
import { messagesSliceAdapter } from '../Slices/messagesSlice';

const Messages = ({ selectedChannelId }) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) =>
    state.channels.channels.find((ch) => ch.id === selectedChannelId)
  );

  const allMessages = useSelector((state) => messagesSliceAdapter.getSelectors().selectAll(state.messages));
  const channelMessages = allMessages.filter((message) => message.channelId === selectedChannelId);
  
  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [dispatch]);

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            {currentChannel && <b>{`# ${currentChannel.name}`}</b>}
          </p>
          <span className='text-muted'>{`${channelMessages.length} сообщений`}</span>
        </div>
        <div className='chat-messages overflow-auto px-5'>
          {channelMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className='mt-auto px-5 py-3'>
          <MessageForm channelId={selectedChannelId} username={username} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
