/* eslint-disable react/button-has-type */
import React from 'react';
import { FieldsForm } from '../../Components';
import { Section, Container, Navbar } from './styles';

const Checkout = () => {
  function handleChangeLang(lang) {
    localStorage.setItem('language', lang);
    window.location.reload();
  }

  return (
    <Section>
      <Navbar>
        <h1>CheckoutForm</h1>
        <div className="box-btn">
          <button
            className={
              localStorage.getItem('language') === 'pt' ? 'active' : ''
            }
            onClick={() => handleChangeLang('pt')}
          >
            PT
          </button>
          <button
            className={
              localStorage.getItem('language') === 'en' ? 'active' : ''
            }
            onClick={() => handleChangeLang('en')}
          >
            EN
          </button>
        </div>
      </Navbar>
      <Container>
        <FieldsForm />
      </Container>
    </Section>
  );
};

export default Checkout;
