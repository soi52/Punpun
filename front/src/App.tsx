import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import theme from './theme';

function App() {
  return (
    <>
      <GlobalStyle/>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
    </>
  );
}

export default App;
