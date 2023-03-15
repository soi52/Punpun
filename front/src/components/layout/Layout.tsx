import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../ui/Header';

const MainStyle = styled.main`
  height: calc(100vh - 80px);
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

function Layout() {
  const onSelect = (item: string) => {
    console.log(item);
    // item에 따른 동작 처리
  };

  return (
    <>
      <Header onSelect={onSelect} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </>
  );
}

export default Layout;
