import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputAdornment,
  MenuItem,
} from '@material-ui/core';
import Cards from 'react-credit-cards';
import {
  FieldsUserForm,
  FormDirectionRow,
  FieldsAdress,
  FieldsPayment,
} from './configFields';
import {
  MaskCPF,
  MaskPhone,
  MaskZipcode,
  MaskCardNumber,
  MaskValidate,
} from '../MaskFields';
import HeaderForm from '../HeaderForm';
import { FormContainer, Container, Button } from './styles';
import { States, PaymentTypes } from '../../constants';
import getZipCode from '../../services/zipcode';
import PaymentMethod from '../PaymentMethod';

const FieldsForm = () => {
  const [paymentType, setPaymentType] = useState('card');

  const [value, setValue] = useState({
    nameUser: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    zipcode: '',
    address: '',
    numberAddress: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
  });

  const [formValid, setFormValid] = useState({
    nameUser: false,
    email: false,
    cpf: false,
    phone: false,
    password: false,
    passwordConfirm: false,
    zipcode: false,
    address: false,
    numberAddress: false,
    complement: false,
    neighborhood: false,
    city: false,
    state: false,
    name: false,
    number: false,
    expiry: false,
    cvc: false,
  });

  async function zipCode(zip) {
    try {
      const response = await getZipCode.get(`/${zip}/json/`);
      setValue({
        ...value,
        address: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
      });
    } catch (err) {
      console.log('erro');
    }
  }

  useEffect(() => {
    const codeZip = value.zipcode
      .split('_')
      .join('')
      .split('-')
      .join('');

    if (codeZip.length === 8) {
      zipCode(codeZip);
    }
  }, [value.zipcode]);

  function handleValue(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const regexCPF = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
    const fieldsStatus = [];

    if (value.nameUser.length < 2) {
      setFormValid(prevState => ({
        ...prevState,
        nameUser: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        nameUser: false,
      }));
      fieldsStatus.push(true);
    }

    if (!regexEmail.test(value.email) || value.email.length === 0) {
      setFormValid(prevState => ({
        ...prevState,
        email: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        email: false,
      }));
      fieldsStatus.push(true);
    }

    if (!regexCPF.test(value.cpf)) {
      setFormValid(prevState => ({
        ...prevState,
        cpf: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        cpf: false,
      }));
      fieldsStatus.push(true);
    }

    if (
      value.phone
        .split('_')
        .join('')
        .split('(')
        .join('')
        .split(')')
        .join('')
        .split('-')
        .join('').length <= 10
    ) {
      setFormValid(prevState => ({
        ...prevState,
        phone: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        phone: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.password.length < 5) {
      setFormValid(prevState => ({
        ...prevState,
        password: true,
      }));
      fieldsStatus.push(false);
    } else if (value.password !== value.passwordConfirm) {
      setFormValid(prevState => ({
        ...prevState,
        password: false,
        passwordConfirm: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        password: false,
        passwordConfirm: false,
      }));
      fieldsStatus.push(true);
    }

    if (
      value.zipcode
        .split('_')
        .join('')
        .split('-')
        .join('').length < 8
    ) {
      setFormValid(prevState => ({
        ...prevState,
        zipcode: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        zipcode: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.address.length < 2) {
      setFormValid(prevState => ({
        ...prevState,
        address: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        address: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.numberAddress.length < 1) {
      setFormValid(prevState => ({
        ...prevState,
        numberAddress: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        numberAddress: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.neighborhood.length < 1) {
      setFormValid(prevState => ({
        ...prevState,
        neighborhood: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        neighborhood: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.city.length < 1) {
      setFormValid(prevState => ({
        ...prevState,
        city: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        city: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.state.length < 1) {
      setFormValid(prevState => ({
        ...prevState,
        state: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        state: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.name.length < 2) {
      setFormValid(prevState => ({
        ...prevState,
        name: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        name: false,
      }));
      fieldsStatus.push(true);
    }

    if (
      value.number
        .split('_')
        .join('')
        .split('-')
        .join('').length < 19
    ) {
      setFormValid(prevState => ({
        ...prevState,
        number: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        number: false,
      }));
      fieldsStatus.push(true);
    }

    if (
      value.expiry
        .split('_')
        .join('')
        .split('/')
        .join('').length < 6
    ) {
      setFormValid(prevState => ({
        ...prevState,
        expiry: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        expiry: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.cvc.length < 3) {
      setFormValid(prevState => ({
        ...prevState,
        cvc: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        cvc: false,
      }));
      fieldsStatus.push(true);
    }

    const formStatus = fieldsStatus.every(element => {
      return element !== false;
    });

    return formStatus;
  }

  function inputProps(field) {
    const cpf = field.nameField === 'cpf';
    const phone = field.nameField === 'phone';
    const zipcode = field.nameField === 'zipcode';
    const number = field.nameField === 'number';
    const expiry = field.nameField === 'expiry';

    let obj = {
      startAdornment: (
        <InputAdornment position="start">
          <i className={field.icon} />
        </InputAdornment>
      ),
    };

    if (number) {
      obj = {
        ...obj,
        inputComponent: MaskCardNumber,
      };
    }

    if (expiry) {
      obj = {
        ...obj,
        inputComponent: MaskValidate,
      };
    }

    if (cpf) {
      obj = {
        ...obj,
        inputComponent: MaskCPF,
      };
    }

    if (zipcode) {
      obj = {
        ...obj,
        inputComponent: MaskZipcode,
      };
    }

    if (phone) {
      obj = {
        ...obj,
        inputComponent: MaskPhone,
      };
    }

    return obj;
  }

  function handleCallbackCard({ issuer }, isValid) {
    if (isValid) {
      setValue({ ...value, issuer });
    }
  }

  function handleInputFocus({ target }) {
    setValue({ ...value, focused: target.name });
  }

  function handlePaymentType(type) {
    setPaymentType(type);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validForm = validateForm();

    if (!validForm) {
      return;
    }

    console.log('Form validado para api', value);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <HeaderForm title="User:" />
      <Container FormDirectionRow={FormDirectionRow ? 'row' : 'column'}>
        {FieldsUserForm &&
          FieldsUserForm.map(field => (
            <FormControl
              key={field.id}
              error={field.nameField && formValid[field.nameField]}
              style={{ width: FormDirectionRow ? field.width : '100%' }}
            >
              <TextField
                placeholder={field.placeholder && field.placeholder}
                variant={field.variant && field.variant}
                label={field.label}
                id={field.label}
                type={field.type}
                select={field.type === 'select'}
                onChange={handleValue}
                value={field.nameField && value[field.nameField]}
                name={field.nameField}
                error={field.nameField && formValid[field.nameField]}
                helperText={
                  field.nameField &&
                  formValid[field.nameField] &&
                  field.msgError
                }
                inputProps={{
                  maxLength: field.maxLength && field.maxLength,
                }}
                InputProps={inputProps(field)}
              />
            </FormControl>
          ))}
      </Container>

      <HeaderForm title="Adress:" margin="70px 0 15px" />
      <Container FormDirectionRow={FormDirectionRow ? 'row' : 'column'}>
        {FieldsAdress &&
          FieldsAdress.map(field => (
            <FormControl
              key={field.id}
              error={field.nameField && formValid[field.nameField]}
              style={{ width: FormDirectionRow ? field.width : '100%' }}
            >
              <TextField
                placeholder={field.placeholder && field.placeholder}
                variant={field.variant && field.variant}
                label={field.label}
                id={field.label}
                type={field.type}
                select={field.type === 'select'}
                onChange={handleValue}
                value={field.nameField && value[field.nameField]}
                name={field.nameField}
                error={field.nameField && formValid[field.nameField]}
                helperText={
                  field.nameField &&
                  formValid[field.nameField] &&
                  field.msgError
                }
                inputProps={{
                  maxLength: field.maxLength && field.maxLength,
                }}
                InputProps={inputProps(field)}
              >
                {field.type === 'select' &&
                  field.nameField === 'state' &&
                  States.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </TextField>
            </FormControl>
          ))}
      </Container>

      <PaymentMethod onCallback={handlePaymentType} />
      {paymentType === PaymentTypes[0] && (
        <>
          <HeaderForm title="Payment:" margin="0 0 15px" />
          <Container FormDirectionRow={FormDirectionRow ? 'row' : 'column'}>
            <div className="space">
              {FieldsPayment &&
                FieldsPayment.map(field => (
                  <FormControl
                    key={field.id}
                    error={field.nameField && formValid[field.nameField]}
                    style={{ width: FormDirectionRow ? field.width : '100%' }}
                  >
                    <TextField
                      placeholder={field.placeholder && field.placeholder}
                      variant={field.variant && field.variant}
                      label={field.label}
                      id={field.label}
                      type={field.type}
                      select={field.type === 'select'}
                      onChange={handleValue}
                      onFocus={handleInputFocus}
                      value={field.nameField && value[field.nameField]}
                      name={field.nameField}
                      error={field.nameField && formValid[field.nameField]}
                      helperText={
                        field.nameField &&
                        formValid[field.nameField] &&
                        field.msgError
                      }
                      inputProps={{
                        maxLength: field.maxLength && field.maxLength,
                      }}
                      InputProps={inputProps(field)}
                    />
                  </FormControl>
                ))}
            </div>

            <div>
              <Cards
                cvc={value.cvc}
                expiry={value.expiry}
                name={value.name}
                number={value.number}
                callback={handleCallbackCard}
                focused={value.focused}
                // placeholders={{ name: 'Nome' }}
                // locale={{ valid: 'Validade' }}
              />
            </div>
          </Container>
        </>
      )}

      <Button disabled={false}>
        Pay &nbsp;&nbsp;
        <i className="fa fa-rocket" />
      </Button>
    </FormContainer>
  );
};

export default FieldsForm;
