import { useTranslation } from 'react-i18next';
import Header from './Header.jsx';

const NoMatchPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'noMatchPage' });

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <span className="display-1">{t('404')}</span>
        <h1 className="h4 text-muted">{t('title')}</h1>
        <p className="text-muted">
          {t('switch')}
          {' '}
          <a href="/">{t('toMainPage')}</a>
        </p>
      </div>
    </div>
  );
};

export default NoMatchPage;
