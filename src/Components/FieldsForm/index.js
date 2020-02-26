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
import { States } from '../../constants';
import getZipCode from '../../services/zipcode';

const FieldsForm = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    zipcode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    cardName: '',
    cardNumber: '',
    cardMMYYYY: '',
    cardCvc: '',
    issuer: '',
  });

  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    cpf: false,
    phone: false,
    password: false,
    passwordConfirm: false,
    zipcode: false,
    address: false,
    number: false,
    complement: false,
    neighborhood: false,
    city: false,
    state: false,
    cardName: false,
    cardNumber: false,
    cardMMYYYY: false,
    cardCvc: false,
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

    if (value.number.length < 1) {
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

    if (value.cardName.length < 2) {
      setFormValid(prevState => ({
        ...prevState,
        cardName: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        cardName: false,
      }));
      fieldsStatus.push(true);
    }

    if (
      value.cardNumber
        .split('_')
        .join('')
        .split('-')
        .join('').length < 19
    ) {
      setFormValid(prevState => ({
        ...prevState,
        cardNumber: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        cardNumber: false,
      }));
      fieldsStatus.push(true);
    }

    if (
      value.cardMMYYYY
        .split('_')
        .join('')
        .split('/')
        .join('').length < 6
    ) {
      setFormValid(prevState => ({
        ...prevState,
        cardMMYYYY: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        cardMMYYYY: false,
      }));
      fieldsStatus.push(true);
    }

    if (value.cardCvc.length < 3) {
      setFormValid(prevState => ({
        ...prevState,
        cardCvc: true,
      }));
      fieldsStatus.push(false);
    } else {
      setFormValid(prevState => ({
        ...prevState,
        cardCvc: false,
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
    const cardNumber = field.nameField === 'cardNumber';
    const cardMMYYYY = field.nameField === 'cardMMYYYY';

    let obj = {
      startAdornment: (
        <InputAdornment position="start">
          <i className={field.icon} />
        </InputAdornment>
      ),
    };

    if (cardNumber) {
      obj = {
        ...obj,
        inputComponent: MaskCardNumber,
      };
    }

    if (cardMMYYYY) {
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

      <HeaderForm title="Payment:" margin="70px 0 15px" />
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
            cvc={value.cardCvc}
            expiry={value.cardMMYYYY}
            name={value.cardName}
            number={value.cardNumber}
            callback={handleCallbackCard}
            // placeholders={{ name: 'Nome' }}
            // locale={{ valid: 'Validade' }}
          />
        </div>
      </Container>

      <Button disabled={false}>
        Send &nbsp;&nbsp;
        <i className="fa fa-rocket" />
      </Button>
    </FormContainer>
  );
};

export default FieldsForm;
