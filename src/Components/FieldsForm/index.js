import React, { useState } from 'react';
import { TextField, FormControl, InputAdornment } from '@material-ui/core';
import { FieldsUserForm, FormDirectionRow } from './configFields';

import { FormContainer, Container, Button } from './styles';

const FieldsForm = () => {
  const [value, setValue] = useState({
    name: '',
    password: '',
    email: '',
  });

  const [formValid, setFormValid] = useState({
    name: false,
    password: false,
    email: false,
  });

  function handleValue(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  return (
    <FormContainer>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className={field.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          ))}
      </Container>

      <Button>ok</Button>
    </FormContainer>
  );
};

export default FieldsForm;
