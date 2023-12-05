import { Container, Row, Col} from 'react-bootstrap';

import backgroundImage from '/cloud_splash.jpg';
import { Link } from 'react-router-dom';

import '../style/Label.css'

function Label() {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '86.5vh',
  };

  return (
    <section style={sectionStyle} className="py-5 text-center">
      <Container>
        <Row className="py-lg-5">
          <Col lg={6} md={8} className="mx-auto">
            <h1 className="main-label">Моделирование потоков метро</h1>
            <p className="main-description-text">
              Предлагаем инновации для городов и метро, обеспечивая комфорт и эффективность. Анализируем пассажиропотоки, прогнозируем спрос и управляем движением с оптимальными стратегиями.
            </p>
            <div className='button-container'>
              <Link to="/registration" className="main-link-button">
                Попробовать AnyMetro
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Label;
