import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>{/* 메인컴포넌트 넣기 */}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
