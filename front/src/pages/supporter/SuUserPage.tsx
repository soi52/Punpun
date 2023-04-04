import { useState } from 'react';
import styled from 'styled-components';

import Sidebar from '../../components/ui/Sidebar';
import MainComponent from '../../components/ui/MainComponent';

import SuUserEdit from '../../components/supporter/SuUserEdit';
import SuDetail from '../../components/supporter/SuDetail';
import ThanksMessage from '../../components/supporter/ThanksMessage';
import SuPointAdd from '../../components/supporter/SuPointAdd';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '회원정보 수정', component: () => <SuUserEdit /> },
  { title: '후원내역', component: () => <SuDetail /> },
  { title: '감사 메세지', component: () => <ThanksMessage /> },
  { title: '충전하기', component: () => <SuPointAdd /> },
];

function SuUserPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  return (
    <>
      <ComponentStyle>
        <Sidebar
          title="후원자 페이지"
          menuItems={menuItems}
          currentMenuItemIndex={currentMenuItemIndex}
          setCurrentMenuItemIndex={setCurrentMenuItemIndex}
        />
        <MainComponent width={53.7}>
          {menuItems[currentMenuItemIndex].component()}
        </MainComponent>
      </ComponentStyle>
    </>
  );
}

export default SuUserPage;
