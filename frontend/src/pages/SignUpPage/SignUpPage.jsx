import { useTranslation } from 'react-i18next';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import signUpImage from '../../assets/images/signUp.jpg';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-items-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image
                  src={signUpImage}
                  className="rounded-circle"
                  alt={t('signUpForm.signUp')}
                />
              </div>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
