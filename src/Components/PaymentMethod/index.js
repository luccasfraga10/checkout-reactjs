/* eslint-disable */
import React, { useState } from 'react';

import { Container } from './styles';

import { PaymentTypes } from '../../constants';

const PaymentMethod = ({ onCallback }) => {
  const [active, setActive] = useState(true);

  function handleClick(type) {
    setActive(!active);
    onCallback(type);
  }

  return (
    <Container>
      <b>PAYMENT METHOD</b>
      <div>
        <span onClick={() => handleClick(PaymentTypes[0])} className={active ? 'active' : ''}>
          <i className="fa fa-credit-card" />
          Credit card
        </span>

        <span onClick={() => handleClick(PaymentTypes[1])} className={!active ? 'active' : ''}>
          <i className="fa fa-barcode" />
          Billet
        </span>
      </div>
    </Container>
  );
};

export default PaymentMethod;
