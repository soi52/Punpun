import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../ui/Header';

function Layout() {
  const onSelect = (item: string) => {
    console.log(item);
    // item에 따른 동작 처리
  };

  return (
    <div>
      <Header onSelect={onSelect} />
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
