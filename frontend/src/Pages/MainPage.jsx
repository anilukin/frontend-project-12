import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setChannels } from '../Slices/channelsSlice';
import { setMessages } from '../Slices/messagesSlice';
import Channels from '../Components/Channels';
import Messages from '../Components/Messages';
import { getAuthHeader } from '../utils/getAuthHeader';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [channelId, setChannel] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      const responseChannels = await axios.get('/api/v1/channels', {
        headers: getAuthHeader(),
      });
      const channels = responseChannels.data;
      dispatcher(setChannels(channels));
      setChannel(channels[0].id);

      const responseMessages = await axios.get('/api/v1/messages', {
        headers: getAuthHeader(),
      });
      const messages = responseMessages.data;
      dispatcher(setMessages(messages));
    };
    fetchContent();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='d-flex flex-column h-100'>
      <div className='container h-100 my-4 overflow-hidden rounded shadow'>
        <div className='row h-100 bg-white flex-md-row'>
          <Channels selectedChannelId={channelId} handleClick={setChannel} />
          <Messages selectedChannelId={channelId} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
