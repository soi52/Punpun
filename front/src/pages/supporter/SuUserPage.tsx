import { useState } from 'react';

import Sidebar from '../../components/ui/Sidebar';
import MainComponent from '../../components/ui/MainComponent';

import SuUserEdit from './SuUserEdit';
import SuDetail from './SuDetail';
import ThanksMessage from '../../components/supporter/ThanksMessage';

const menuItems = [
  { title: '회원정보 수정', component: () => <SuUserEdit /> },
  { title: '후원내역', component: () => <SuDetail /> },
  { title: '감사 메세지', component: () => <ThanksMessage /> },
];

function SuUserPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  return (
    <>
      <div>
        <Sidebar
          title="후원자 페이지"
          menuItems={menuItems}
          currentMenuItemIndex={currentMenuItemIndex}
          setCurrentMenuItemIndex={setCurrentMenuItemIndex}
        />
        <MainComponent width={70}>
          {menuItems[currentMenuItemIndex].component()}
        </MainComponent>
      </div>
    </>
  );
}

export default SuUserPage;
