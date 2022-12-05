import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NoMatchPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'noMatchPage' });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <span className="display-1">{t('404')}</span>
      <h1 className="h4 text-muted">{t('title')}</h1>
      <p className="text-muted">
        {t('switch')}
        {' '}
        <Link to="/">{t('toMainPage')}</Link>
      </p>
    </div>
  );
};

export default NoMatchPage;
