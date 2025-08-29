import { ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const ChannelButton = ({ channel, selectedChannelId, handleClick }) => (
  <Button
    variant={channel.id === selectedChannelId ? 'secondary' : null}
    className='w-100 rounded-0 text-start text-truncate'
    onClick={() => handleClick(channel.id)}
  >
    <span className='me-1'>#</span>
    {channel.name}
  </Button>
);

const Channel = ({
  channel,
  selectedChannelId,
  handleClick,
  handleRename,
  handleRemove,
}) => {
  return channel.removable ? (
    <li className='nav-item w-100'>
      <ButtonGroup className='d-flex dropdown btn-group'>
        <ChannelButton
          channel={channel}
          selectedChannelId={selectedChannelId}
          handleClick={handleClick}
        />
        <DropdownButton
          as={ButtonGroup}
          variant={channel.id === selectedChannelId ? 'secondary' : null}
        >
          <Dropdown.Item eventKey='1' onClick={() => handleRemove(channel)}>
            Удалить
          </Dropdown.Item>
          <Dropdown.Item eventKey='2' onClick={() => handleRename(channel)}>
            Переименовать
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </li>
  ) : (
    <ChannelButton
      channel={channel}
      selectedChannelId={selectedChannelId}
      handleClick={handleClick}
    />
  );
};

export default Channel;
