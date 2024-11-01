import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel, selectCurrentChannel } from '../../store/slices/channelsSlice';
import { REMOVING_MODAL, RENAMING_MODAL } from '../modals/constants';

const ChannelItem = ({ channelItem, handleShowModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectCurrentChannel);

  const handleSelectChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  return (
    <Nav.Item>
      {channelItem.removable ? (
        <Dropdown as={ButtonGroup} drop="down" className="w-100">
          <Button
            onClick={() => handleSelectChannel(channelItem)}
            className="w-100 rounded-0 text-start text-truncate"
            variant={currentChannel.id === channelItem.id ? 'secondary' : 'light'}
          >
            <span className="me-1">&#35;</span>
            {channelItem.name}
          </Button>
          <Dropdown.Toggle
            split
            variant={currentChannel.id === channelItem.id ? 'secondary' : 'light'}
            id={`dropdown-split-button${channelItem.id}`}
          >
            <span className="visually-hidden">{t('chat.manage')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleShowModal(REMOVING_MODAL, channelItem)}>
              {t('modals.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleShowModal(RENAMING_MODAL, channelItem)}>
              {t('modals.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={currentChannel.id === channelItem.id ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleSelectChannel(channelItem)}
        >
          <span className="me-1">&#35;</span>
          {channelItem.name}
        </Button>
      )}
    </Nav.Item>
  );
};

export default ChannelItem;
