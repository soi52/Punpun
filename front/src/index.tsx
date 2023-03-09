import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      {/* RecoilRoot provider를 이용하여 recoil을 사용가능하도록 설정해줍니다. */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
);
