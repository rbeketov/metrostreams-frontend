import { Container, Nav, Navbar, Image} from 'react-bootstrap';
import './Footer.css';

import backgroundImage from '/under-cloud.jpeg';

function FooterAnyMetro() {

  return (
    <div>
        <Image src={backgroundImage} fluid alt="Background Image" />
        <Navbar className="color-navbar custom-navbar" expand="lg">
            <Container>
                <Nav className="ma-auto">
                <a href="" className="contact-button">
                    Связаться с нами
                </a>
                </Nav>
                <Nav className="ms-auto footer-text">
                <p>© The Company AnyMetro</p>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
}

export default FooterAnyMetro;
