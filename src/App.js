import React from 'react';
import { IntlProvider } from 'react-intl';
import GlobalStyle from './styles/global';
import Routes from './routes';
import pt from './translations/pt.json';
import en from './translations/en.json';

const messages = {
  pt,
  en,
};

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'pt');
}

const language = localStorage.getItem('language');

function App() {
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <div>
        <GlobalStyle />
        <Routes />
      </div>
    </IntlProvider>
  );
}

export default App;
