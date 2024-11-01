import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import LoginForm from './LoginForm';
import loginImage from '../../assets/images/login.jpg';
import { SIGNUP_PATH, getRoutesPath } from '../../router/routesPath';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body as={Row} className="p-5">
              <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                <Image
                  src={loginImage}
                  className="rounded-circle"
                  alt={t('loginForm.login')}
                />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <Container className="text-center">
                <span>{t('loginForm.footerText')}</span>
                <NavLink to={getRoutesPath(SIGNUP_PATH)}>
                  {t('loginForm.signUp')}
                </NavLink>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
