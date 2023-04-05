import { createGlobalStyle } from 'styled-components';
import Default from './resources/images/default.png';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    background-color: #f0f0f0;
    cursor: url(${Default});

  ::-webkit-scrollbar {
    width: 9px;  /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #5D5A88; /* 스크롤바의 색상 */
    
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    // background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
  }

`;

export default GlobalStyle;
