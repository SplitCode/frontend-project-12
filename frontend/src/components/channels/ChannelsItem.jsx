import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelItem = ({
  channel, currentChannel, handleSelectChannel, handleShowModal,
}) => {
  const { t } = useTranslation();

  return (
    <Nav.Item key={channel.id} className="w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} drop="down" className="w-100">
          <Button
            onClick={() => handleSelectChannel(channel)}
            className="w-100 rounded-0 text-start text-truncate"
            variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
          >
            <span className="me-1">&#35;</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            className="text-end"
            split
            variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
            id={`dropdown-split-button${channel.id}`}
          />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleShowModal('removing', channel)}>
              {t('modals.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleShowModal('renaming', channel)}>
              {t('modals.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start"
          onClick={() => handleSelectChannel(channel)}
        >
          <span className="me-1">&#35;</span>
          {channel.name}
        </Button>
      )}
    </Nav.Item>
  );
};

export default ChannelItem;
