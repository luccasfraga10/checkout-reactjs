/* eslint-disable */
import React, { useState } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
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
      <b><FormattedHTMLMessage id="checkout-form-payment-method-title" /></b>
      <div>
        <span onClick={() => handleClick(PaymentTypes[0])} className={active ? 'active' : ''}>
          <i className="fa fa-credit-card" />
          <FormattedHTMLMessage id="checkout-form-payment-method-card" />
        </span>

        <span onClick={() => handleClick(PaymentTypes[1])} className={!active ? 'active' : ''}>
          <i className="fa fa-barcode" />
          <FormattedHTMLMessage id="checkout-form-payment-method-billet" />
        </span>
      </div>
    </Container>
  );
};

export default PaymentMethod;
