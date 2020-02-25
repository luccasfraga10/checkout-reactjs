import React, { useState } from 'react';
import { TextField, FormControl, InputAdornment } from '@material-ui/core';
import { FieldsUserForm, FormDirectionRow } from './configFields';
import { MaskCPF, MaskPhone } from '../MaskFields';
import { FormContainer, Container, Button } from './styles';

const FieldsForm = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    cpf: false,
    phone: false,
    password: false,
    passwordConfirm: false,
  });

  function handleValue(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const regexCPF = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
    const regexPassword = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[aA-zZ]).*$/;
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

    if (value.phone.length <= 14) {
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

    if (
      !regexPassword.test(value.password) ||
      !regexPassword.test(value.passwordConfirm)
    ) {
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

    const formStatus = fieldsStatus.every(element => {
      return element !== false;
    });

    return formStatus;
  }

  function inputProps(field) {
    const cpf = field.nameField === 'cpf';
    const phone = field.nameField === 'phone';

    let obj = {
      startAdornment: (
        <InputAdornment position="start">
          <i className={field.icon} />
        </InputAdornment>
      ),
    };

    if (cpf) {
      obj = {
        ...obj,
        inputComponent: MaskCPF,
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

      <Button disabled={false}>Enviar</Button>
    </FormContainer>
  );
};

export default FieldsForm;
