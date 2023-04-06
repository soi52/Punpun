import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    background-color: #F1F3F4;
  }

  ::-webkit-scrollbar {
    width: 9px;
  }

  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: #5D5A88;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    // background: rgba(33, 122, 244, .1);
  }

`;

export default GlobalStyle;
