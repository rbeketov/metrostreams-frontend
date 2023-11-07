import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import '../style/Navbar.css';

function NavbarAnyMetro() {
    return (
        <Navbar className="color-navbar" expand="lg">
        <Container>
            <a href="/modelings/">
                <Image src="/logo.png" roundedCircle className="logo-img" alt="Логотип AnyMetro" />
            </a>
            <Navbar.Brand href="/modelings/" className="brand-text">AnyMetro</Navbar.Brand>
            <Nav className="ms-auto">
                <a href="" className="btns-log">Зарегистрироваться</a>
                <a href="" className="btns-log">Войти</a>
            </Nav>
        </Container>
        </Navbar>
    );
}
  
export default NavbarAnyMetro;