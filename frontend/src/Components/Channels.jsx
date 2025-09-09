import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Channel from './Channel';
import getModal from '../modals/index.js';
import { removeChannel, setChannels } from '../Slices/channelsSlice.js';

const Channels = ({ selectedChannelId, handleClick }) => {
  const dispatcher = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const [modal, setModal] = useState({ name: null, channelName: null });
  const Modal = modal ? getModal(modal.name) : null;

  const handleAdd = () => setModal({ name: 'adding', channel: null });
  const handleRename = (channel) => setModal({ name: 'renaming', channel });
  const handleRemove = (channel) => setModal({ name: 'removing', channel });
  const handleClose = () => setModal({ name: null, channel: null });

  const handleAddChannel = (newChannel) => {
    dispatcher(setChannels([...channels, newChannel]));
    handleClick(newChannel.id);
    handleClose();
  };

  const handleRenameChannel = (channel) => {
    const updatedChannels = channels.map((ch) =>
      ch.id === channel.id ? { ...ch, name: channel.name } : ch
    );
    dispatcher(setChannels(updatedChannels));
    handleClose();
  };

  const handleRemoveChannel = (channel) => {
    const updatedChannels = channels.filter((ch) => ch.id !== channel.id);
    dispatcher(setChannels(updatedChannels));
    dispatcher(removeChannel(channel.id));
    if (selectedChannelId === channel.id) {
      handleClick(channels[0].id);
    }
    handleClose();
  };

  return (
    <>
      <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
        <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
          <b>{t('channels.channelsTitle')}</b>
          <Button
            variant='outline-light'
            className='p-0 text-primary btn-group-vertical'
            onClick={handleAdd}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-plus-square'
              viewBox='0 0 16 16'
            >
              <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
            </svg>
          </Button>
        </div>
        <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
          {channels.map((ch) => (
            <Channel
              key={ch.id}
              channel={ch}
              selectedChannelId={selectedChannelId}
              handleClick={handleClick}
              handleRename={handleRename}
              handleRemove={handleRemove}
            />
          ))}
        </ul>
      </div>
      {Modal && (
        <Modal
          show={true}
          onClose={handleClose}
          onAdd={handleAddChannel}
          onRename={handleRenameChannel}
          onRemove={handleRemoveChannel}
          channel={modal.channel}
        />
      )}
    </>
  );
};

export default Channels;
