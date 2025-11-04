import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChannelButton = ({ channel, selectedChannelId, handleClick }) => (
  <Button
    variant={channel.id === selectedChannelId ? 'secondary' : null}
    className="w-100 rounded-0 text-start text-truncate"
    onClick={() => handleClick(channel.id)}
  >
    <span className="me-1">#</span>
    {channel.name}
  </Button>
)

const Channel = ({
  channel,
  selectedChannelId,
  handleClick,
  handleRename,
  handleRemove,
}) => {
  const { t } = useTranslation()
  return channel.removable
    ? (
      <li className="nav-item w-100">
        <Dropdown
          as={ButtonGroup}
          variant={channel.id === selectedChannelId ? 'secondary' : null}
          className="d-flex"
        >
          <ChannelButton
            channel={channel}
            selectedChannelId={selectedChannelId}
            handleClick={handleClick}
          />

          <Dropdown.Toggle
            variant={channel.id === selectedChannelId ? 'secondary' : null}
            aria-expanded="false"
            className="flex-grow-0"
            split
          >
            <span className="visually-hidden">
              {t('buttons.manageChannelButton')}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => handleRemove(channel)}>
              {t('buttons.removeButton')}
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => handleRename(channel)}>
              {t('buttons.renameButton')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    )
    : (
      <ChannelButton
        channel={channel}
        selectedChannelId={selectedChannelId}
        handleClick={handleClick}
      />
    )
}

export default Channel
