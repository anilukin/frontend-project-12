import { useSelector } from 'react-redux';
import Channel from './Channel';

const Channels = ({ selectedChannelId, handleClick }) => {
  const channels = useSelector((state) => state.channels.channels);
  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
      </div>
      <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((ch) => (
          <Channel
            key={ch.id}
            channel={ch}
            selectedChannelId={selectedChannelId}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
