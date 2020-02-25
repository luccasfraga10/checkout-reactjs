import React from 'react';
import { HeaderForm, FieldsForm } from '../../Components';
import { Section, Container, Navbar } from './styles';

const Home = () => (
  <Section>
    <Navbar>
      <h1>CheckoutForm</h1>
    </Navbar>
    <Container>
      <HeaderForm title="Personal data" />
      <FieldsForm />
    </Container>
  </Section>
);

export default Home;
