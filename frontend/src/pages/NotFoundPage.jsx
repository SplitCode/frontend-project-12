import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/images/notFound.svg';
import getRoutesPath from '../constants/routesPath';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('notFoundPage.title')}
        className="img-fluid h-25"
        src={notFoundImage}
      />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.proposal')}
        {' '}
        <NavLink to={getRoutesPath('ROOT')}>{t('notFoundPage.direct')}</NavLink>
      </p>
    </div>
  );
};

export default NotFoundPage;
