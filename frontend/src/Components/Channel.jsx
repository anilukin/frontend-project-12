import { Button } from 'react-bootstrap';

const Channel = ({ channel, selectedChannelId, handleClick }) => {
  return (
    <li className='nav-item w-100'>
      <Button
        variant={channel.id === selectedChannelId ? 'secondary' : null}
        className='w-100 rounded-0 text-start'
        onClick={() => handleClick(channel.id)}
      >
        <span className='me-1'>#</span>
        {channel.name}
      </Button>
    </li>
  );
};

export default Channel;
