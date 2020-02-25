import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    line-height: 1.2;
    font-family: 'Open Sans', sans-serif;
  }

  html, body, #root {
    min-height: 100%;
    margin: 0;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased !important;
  }
`;
