import { BrowserRouter, Route, Routes } from 'react-router-dom';
//후원자페이지
import MainPage from './pages/MainPage';
import RedirectPage from './pages/RedirectPage';
import SuUserPage from './pages/supporter/SuUserPage';
import SuSearchStore from './pages/supporter/SuSearchStore';

// 아동페이지
import ChMainPage from './pages/child/ChMainPage';
import ChStoreDetailPage from './pages/ChStoreDetailPage';
import ChUserPage from './pages/child/ChUserPage';

// 사장님페이지
import OwStorePage from './pages/owner/OwStorePage';
import OwBookingPage from './pages/owner/OwBookingPage';
import OwManagePage from './pages/owner/OwManagePage';
import StoreRegisterPage from './pages/owner/StoreRegisterPage';

import Layout from './components/layout/Layout';
import FullPage from './pages/Fullpage';

import TestPage from './pages/Test';
import AddNumberPage from './pages/AddNumberPage';
import TestCopy from './pages/TestCopy';
import StoreUpdatePage from './pages/owner/StoreUpdatePage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FullPage />} />
        <Route path="/" element={<Layout />}>
          {/* 후원페이지 */}
          <Route path="/kakaoLogin" element={<RedirectPage />} />
          <Route path="/addnumber" element={<AddNumberPage />} />
          <Route path="/sumain" element={<MainPage />} />
          <Route path="/suuser" element={<SuUserPage />} />
          <Route path="/susearch" element={<SuSearchStore />} />

          {/* 아동페이지 */}
          <Route path="/chmain" element={<ChMainPage />} />
          <Route path="/chuser" element={<ChUserPage />} />

          {/* 사장님페이지 */}
          <Route path="/owstore/:store_id" element={<OwStorePage />} />
          <Route
            path="/owstore/:store_id/booking"
            element={<OwBookingPage />}
          />
          <Route path="/owstorelist" element={<OwManagePage />} />
          <Route path="/owregister" element={<StoreRegisterPage />} />
          <Route
            path="/owstore/:store_id/update"
            element={<StoreUpdatePage />}
          />

          {/* 공통페이지 (식당상세) */}
          <Route path="/store/:storeId" element={<ChStoreDetailPage />} />

          {/* 디버깅페이지 */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/test1" element={<TestCopy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
