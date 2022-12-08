import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { setCurrentChannel } from '../slices/channelsSlice.js';

const RenderChannel = ({ props: { channel, currentChannelId, showModal } }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const getButtonVariant = (id) => (currentChannelId === id ? 'secondary' : null);

  const channelButton = () => (
    <Button onClick={() => dispatch(setCurrentChannel(channel.id))} className="w-100 rounded-0 text-start text-truncate" variant={getButtonVariant(channel.id)}>
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );

  return (
    <Nav.Item className="w-100" as="li">
      {channel.removable ? (
        <Dropdown className="d-flex" as={ButtonGroup}>
          {channelButton()}
          <Dropdown.Toggle split variant={getButtonVariant(channel.id)}>
            <span className="visually-hidden">{t('channelSettings')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', channel)} as="button">{t('deleteChannel')}</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel)} as="button">{t('renameChannel')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : channelButton()}
    </Nav.Item>
  );
};

export default RenderChannel;
