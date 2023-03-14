import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainNavigation from '../ui/Header';

function Layout() {
  return (
    <div>
      <MainNavigation />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </div>
  );
}

export default Layout;

const MainStyle = styled.main`
  // padding-top: 90px;
`;
