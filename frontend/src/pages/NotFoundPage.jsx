import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/images/notFound.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFoundPage.title')}
        className="img-fluid h-25"
        src={notFoundImage}
        width="227"
        height="227"
      />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.proposal')}
        {' '}
        <NavLink to="/">{t('notFoundPage.direct')}</NavLink>
      </p>
    </div>
  );
};

export default NotFoundPage;
