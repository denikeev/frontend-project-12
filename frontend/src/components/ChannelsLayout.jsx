import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import RenderChannel from './RenderChannel.jsx';
import { channelsSelector } from '../slices/channelsSlice.js';

const ChannelsLayout = ({ currentChannelId, showModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const channels = useSelector(channelsSelector.selectAll);

  return (
    <Col xs={5} sm={4} md={3} xxl={2} className="h-100 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button onClick={() => showModal('adding')} className="p-2 text-primary btn-group-vertical" variant={null}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">{t('addChannelLabel')}</span>
        </Button>
      </div>
      <Nav className="px-2" as="ul">
        {channels
          .map((channel) => (
            <RenderChannel props={{ channel, currentChannelId, showModal }} key={channel.id} />
          ))}
      </Nav>
    </Col>
  );
};

export default ChannelsLayout;
