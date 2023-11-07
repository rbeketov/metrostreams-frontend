import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import logoImage from '/cloud_splash.jpg';
import '../style/Navbar.css';

function NavbarAnyMetro() {
    return (
        <Navbar className="color-navbar" expand="lg">
        <Container>
            <Link to="/modelings/">
                <Image src={logoImage} roundedCircle className="logo-img" alt="Логотип AnyMetro" />
            </Link>
            <Navbar.Brand href="/modelings/" className="brand-text">AnyMetro</Navbar.Brand>
            <Nav className="ms-auto">
                <Link to="" className="btns-log">Зарегистрироваться</Link>
                <Link to="" className="btns-log">Войти</Link>
            </Nav>
        </Container>
        </Navbar>
    );
}
  
export default NavbarAnyMetro;