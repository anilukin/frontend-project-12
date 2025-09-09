import { ButtonGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
            {t('buttons.removeButton')}
          </Dropdown.Item>
          <Dropdown.Item eventKey='2' onClick={() => handleRename(channel)}>
            {t('buttons.renameButton')}
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
