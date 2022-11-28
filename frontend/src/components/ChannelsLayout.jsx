import {
  Button,
  Col,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, channelsSelector } from '../slices/channelsSlice.js';

const ChannelsLayout = ({ currentChannelId, showModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const channels = useSelector(channelsSelector.selectAll);
  console.log('channels>>>', channels);
  const dispatch = useDispatch();
  const getButtonVariant = (id) => (currentChannelId === id ? 'secondary' : null);

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button onClick={() => showModal('adding')} className="p-0 text-primary btn-group-vertical" variant={null}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Button>
      </div>
      <Nav fill className="px-2" as="ul">
        {channels.map((channel) => (
          channel.removable ? (
            <Nav.Item className="w-100" as="li" key={channel.id}>
              <Dropdown className="d-flex" as={ButtonGroup}>
                <Button onClick={() => dispatch(setCurrentChannel(channel.id))} className="w-100 rounded-0 text-start" variant={getButtonVariant(channel.id)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle split variant={getButtonVariant(channel.id)} />
                <Dropdown.Menu>
                  <Dropdown.Item as="button">Удалить</Dropdown.Item>
                  <Dropdown.Item as="button">Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          ) : (
            <Nav.Item className="w-100" as="li" key={channel.id}>
              <Button onClick={() => dispatch(setCurrentChannel(channel.id))} className="w-100 rounded-0 text-start" variant={getButtonVariant(channel.id)}>
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            </Nav.Item>
          )
        ))}
      </Nav>
    </Col>
  );
};

export default ChannelsLayout;
