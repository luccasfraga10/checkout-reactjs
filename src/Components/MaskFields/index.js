import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import Cards from 'react-credit-cards';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedHTMLMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withRouter } from 'react-router-dom';
import apiInterceptor from '../../../services';
import { Form } from './styles';
import Btn from '../button';

function MaskCPF(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]}
      showMask
    />
  );
}

function MaskCardNumber(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      showMask
    />
  );
}

function MaskValidate(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      showMask
    />
  );
}
class FormPayment extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    btnLoading: 'Concluir a minha doação',
    valueTotalShow: 0,
    paymentType: true,
    checked: false,
    name: '',
    email: '',
    password: '',
    cpf: '',

    cvc: '',
    expiry: '',
    focus: '',
    nameCard: '',
    number: '',
    issuer: '',
  };

  componentDidMount() {
    if (localStorage.getItem('item')) {
      const item = JSON.parse(localStorage.getItem('item'));
      this.setState({ checked: item.mensalista });
    }

    if (localStorage.getItem('item')) {
      this.setState({
        valueTotalShow: JSON.parse(localStorage.getItem('item')).value,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.paymentType !== prevProps.paymentType) {
      this.setState({ paymentType: !this.state.paymentType });
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked }, () => {
      const { checked } = this.state;
      const newObj = {
        ...JSON.parse(localStorage.getItem('item')),
        mensalista: checked,
      };

      localStorage.setItem('item', JSON.stringify(newObj));
    });
  };

  handleValue = val => {
    return this.setState({ [val.name]: val.value });
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleSubmit = async () => {
    this.setState({ btnLoading: 'carregando..' });
    const {
      paymentType,
      name,
      email,
      password,
      cpf,
      cvc,
      expiry,
      nameCard,
      number,
      issuer,
    } = this.state;

    let request = {
      idplano: JSON.parse(localStorage.getItem('item')).mensalista
        ? JSON.parse(localStorage.getItem('item')).idMensal
        : JSON.parse(localStorage.getItem('item')).id,
      ST_NOME_SAC: name,
      ST_EMAIL_SAC: email,
      FL_PAGAMENTOPREF_SAC: 0,
      senha: password,
      senha_confirmacao: password,
      ST_RG_SAC: cpf
        .split('.')
        .join('')
        .split('-')
        .join('')
        .split(' ')
        .join(''),
      aceite_contrato: 1,
    };

    if (paymentType) {
      request = {
        ...request,
        FL_PAGAMENTOPREF_SAC: 3,
        ST_CARTAO_SAC: number.split(' ').join(''),
        ST_MESVALIDADE_SAC: expiry.split('/')[0],
        ST_ANOVALIDADE_SAC: expiry.split('/')[1],

        ST_SEGURANCACARTAO_SAC: cvc,
        ST_CARTAOBANDEIRA_SAC: issuer,
        ST_NOMECARTAO_SAC: nameCard,
      };
    }

    console.log('request =>', request);

    try {
      await apiInterceptor.post(`financeiro/checkout`, request);
      const { history } = this.props;
      history.push('/sucesso');
    } catch (err) {
      console.log('Erro', err);
      this.setState({ btnLoading: 'Erro tentar, novamente.' });
    }
  };

  render() {
    const {
      valueTotalShow,
      paymentType,
      checked,
      name,
      email,
      password,
      cpf,
      cvc,
      expiry,
      nameCard,
      number,
    } = this.state;
    return (
      <Form>
        <b>
          <FormattedHTMLMessage id="forms-dados" />
        </b>

        <div className="box-info box-info-v2">
          <FormControl variant="outlined">
            <InputLabel htmlFor="user-name">
              <FormattedHTMLMessage id="forms-name" />
            </InputLabel>
            <OutlinedInput
              id="user-name"
              type="text"
              onChange={e => this.handleValue(e.target)}
              value={name}
              name="name"
              // error
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <i className="fa fa-user" />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="user-email">Email:</InputLabel>
            <OutlinedInput
              id="user-email"
              type="text"
              onChange={e => this.handleValue(e.target)}
              value={email}
              name="email"
              // error
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <i className="fa fa-envelope" />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="user-password">
              <FormattedHTMLMessage id="forms-password" />
            </InputLabel>
            <OutlinedInput
              id="user-password"
              type="password"
              onChange={e => this.handleValue(e.target)}
              value={password}
              name="password"
              // error
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <i className="fa fa-lock" />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="user-cpf">
              <FormattedHTMLMessage id="forms-cpf" />
            </InputLabel>
            <OutlinedInput
              id="user-cpf"
              type="text"
              onChange={e => this.handleValue(e.target)}
              value={cpf}
              name="cpf"
              inputComponent={MaskCPF}
              // error
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <i className="fa fa-id-card" />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>

        {paymentType && (
          <>
            <b>Dados do Cartão</b>
            <div className="box-info">
              <div className="card">
                <Cards
                  cvc={this.state.cvc}
                  expiry={this.state.expiry}
                  focus={this.state.focus}
                  name={this.state.nameCard}
                  number={this.state.number}
                  callback={this.handleCallback}
                  placeholders={{ name: 'Nome' }}
                  locale={{ valid: 'Validade' }}
                />
              </div>
              <div className="infoscard">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="user-name-card">
                    Nome do cartão:
                  </InputLabel>
                  <OutlinedInput
                    id="user-name-card"
                    type="text"
                    onChange={e => this.handleValue(e.target)}
                    value={nameCard}
                    name="nameCard"
                    // error
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <i className="fa fa-user" />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="user-number-card">
                    Número do cartão:
                  </InputLabel>
                  <OutlinedInput
                    id="user-number-card"
                    type="text"
                    onChange={e => this.handleValue(e.target)}
                    value={number}
                    name="number"
                    inputComponent={MaskCardNumber}
                    // error
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <i className="fa fa-credit-card" />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>

                <FormControl variant="outlined">
                  <InputLabel htmlFor="user-validate-cardyy">
                    Validade Mês/Ano:
                  </InputLabel>
                  <OutlinedInput
                    id="user-validate-cardyy"
                    type="text"
                    onChange={e => this.handleValue(e.target)}
                    value={expiry}
                    name="expiry"
                    inputComponent={MaskValidate}
                    // error
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <i className="fa fa-calendar" />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>

                <FormControl variant="outlined">
                  <InputLabel htmlFor="user-cvc-card">
                    Código de Segurança
                  </InputLabel>
                  <OutlinedInput
                    id="user-cvc-card"
                    type="text"
                    onChange={e => this.handleValue(e.target)}
                    value={cvc}
                    name="cvc"
                    inputProps={{ maxLength: 3 }}
                    // error
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <i className="fa fa-lock" />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </div>
            </div>
          </>
        )}

        <div>
          <div className="boxBtnPayment">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={this.handleChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Continuar doando mensalmente"
            />
            <Btn
              bgColor="#1CA9CA"
              color="#fff"
              padding="22px 60px"
              text={this.state.btnLoading}
              onClick={this.handleSubmit}
            />
          </div>

          <div className="info">
            <p>Ambiente totalmente seguro para a sua doação =)</p>
            <p>Obrigado por nos ajudar com R${valueTotalShow} por mês</p>
          </div>
        </div>
      </Form>
    );
  }
}

export default withRouter(FormPayment);
