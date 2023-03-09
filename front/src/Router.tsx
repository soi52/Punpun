import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RedirectPage from './pages/RedirectPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/login/oauth' element={<RedirectPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
