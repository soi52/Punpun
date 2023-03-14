import React, { useState } from 'react';
import styled from 'styled-components';
import MainComponent from '../../components/ui/MainComponent';

import BookingToday from '../../components/owner/booking/BookingToday';
import BookingList from '../../components/owner/booking/BookingList';
import Share from '../../components/owner/booking/Share';
import ShareList from '../../components/owner/booking/ShareList';
import Sidebar from '../../components/ui/Sidebar';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '오늘의 예약', component: () => <BookingToday /> },
  { title: '예약 목록', component: () => <BookingList /> },
  { title: '나눔 등록', component: () => <Share /> },
  { title: '나눔 목록', component: () => <ShareList /> },
];

function OwBookingPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  return (
    <ComponentStyle>
      <Sidebar
        title="예약 관리"
        menuItems={menuItems}
        currentMenuItemIndex={currentMenuItemIndex}
        setCurrentMenuItemIndex={setCurrentMenuItemIndex}
      />
      <MainComponent width={70}>
        {menuItems[currentMenuItemIndex].component()}
      </MainComponent>
    </ComponentStyle>
  );
}

export default OwBookingPage;
