import React, { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      {/* RecoilRoot provider를 이용하여 recoil을 사용가능하도록 설정해줍니다. */}
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
);
