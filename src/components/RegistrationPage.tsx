import { FC } from 'react';
import NavbarAnyMetro from './Navbar';
import FooterAnyMetro from './Footer';
import { Link } from 'react-router-dom';

import '../style/RegistrationPage.css'

const RegistrationPage: FC = () => {

  return (
    <div>
        <NavbarAnyMetro />
  
        <FooterAnyMetro />
    </div>
  );
}

export default RegistrationPage;
