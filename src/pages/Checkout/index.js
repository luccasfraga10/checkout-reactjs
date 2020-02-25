import React from 'react';
import { FieldsForm } from '../../Components';
import { Section, Container, Navbar } from './styles';

const Home = () => (
  <Section>
    <Navbar>
      <h1>CheckoutForm</h1>
    </Navbar>
    <Container>
      <FieldsForm />
    </Container>
  </Section>
);

export default Home;
