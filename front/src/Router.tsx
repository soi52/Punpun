import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RedirectPage from './pages/RedirectPage';

// 아동페이지
import ChMainPage from './pages/child/ChMainPage';
import ChStoreDetailPage from './pages/child/ChStoreDetailPage';
import ChUserPage from './pages/child/ChUserPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/login/oauth' element={<RedirectPage/>}/>

        {/* 아동페이지 */}
        <Route path='/chmain' element={<ChMainPage/>}/>
        <Route path='/chstore' element={<ChStoreDetailPage/>}/>
        <Route path='/chuser' element={<ChUserPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;