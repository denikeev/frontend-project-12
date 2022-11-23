import {
  Button,
  Col,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { channelsSelector } from '../slices/channelsSlice.js';

const ChannelsLayout = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const channels = useSelector(channelsSelector.selectAll);

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
      </div>
      <Nav fill className="px-2" as="ul">
        {channels.map((channel) => (
          <Nav.Item className="w-100" as="li" key={channel.id}>
            <Button className="w-100 rounded-0 text-start" variant={null}>
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default ChannelsLayout;
