import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './routes/MainPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지 */}
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
