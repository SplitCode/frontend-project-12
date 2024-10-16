import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoutButton from './LogoutButton';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={NavLink} to="/">{t('header.title')}</Navbar.Brand>
        <LogoutButton />
      </Container>
    </Navbar>
  );
};

export default Header;
