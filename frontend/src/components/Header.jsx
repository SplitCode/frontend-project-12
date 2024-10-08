import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => (
  <Navbar expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Container>
      <Navbar.Brand as={NavLink} to="/">Hexlet Chat</Navbar.Brand>
      <LogoutButton />
      {/* <button type="button" className="btn btn-primary">Выйти</button> */}
    </Container>
  </Navbar>
);

export default Header;
