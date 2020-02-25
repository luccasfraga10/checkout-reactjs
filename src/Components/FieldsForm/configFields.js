export const FormDirectionRow = true;

export const FieldsUserForm = [
  {
    variant: 'standard', // standard || outlined || filled
    id: 1,
    nameField: 'name',
    label: 'Name',
    type: 'text',
    icon: 'fa fa-user',
    placeholder: '',
    msgError: 'Enter a valid name.',
    maxLength: 1,
    valid: '',
    maskRegex: '',
    width: '33.3%',
  },
  {
    variant: 'standard', // standard || outlined || filled
    id: 2,
    nameField: 'password',
    label: 'Password',
    type: 'password',
    icon: 'fa fa-user',
    placeholder: '',
    msgError: 'Enter a valid password.',
    maxLength: '',
    valid: '',
    maskRegex: '',
    width: '33.3%',
  },
];
