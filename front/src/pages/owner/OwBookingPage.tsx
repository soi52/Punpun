import React, { useState } from 'react';
import styled from 'styled-components';
import MainComponent from '../../components/ui/MainComponent';
import BookingSidebarComponent from '../../components/owner/sidebar/BookingSidebar';
import BookingToday from '../../components/owner/booking/BookingToday';
import BookingList from '../../components/owner/booking/BookingList';
import Share from '../../components/owner/booking/Share';
import ShareList from '../../components/owner/booking/ShareList';

const ComponentStyle = styled.div`
  padding: 0px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const OwBookingPage: React.FC = () => {
  const [show, setShow] = useState({
    BookingToday: true,
    BookingList: false,
    Share: false,
    ShareList: false,
  });

  const onClickBookingToday = () => {
    setShow({
      BookingToday: true,
      BookingList: false,
      Share: false,
      ShareList: false,
    });
  };

  const onClickBookingList = () => {
    setShow({
      BookingToday: false,
      BookingList: true,
      Share: false,
      ShareList: false,
    });
  };

  const onClickShare = () => {
    setShow({
      BookingToday: false,
      BookingList: false,
      Share: true,
      ShareList: false,
    });
  };

  const onClickShareList = () => {
    setShow({
      BookingToday: false,
      BookingList: false,
      Share: false,
      ShareList: true,
    });
  };

  return (
    <ComponentStyle>
      <BookingSidebarComponent
        onClickBookingToday={onClickBookingToday}
        onClickBookingList={onClickBookingList}
        onClickShare={onClickShare}
        onClickShareList={onClickShareList}
      />
      <MainComponent width={70}>
        {show.BookingToday ? <BookingToday /> : null}
        {show.BookingList ? <BookingList /> : null}
        {show.Share ? <Share /> : null}
        {show.ShareList ? <ShareList /> : null}
      </MainComponent>
    </ComponentStyle>
  );
};

export default OwBookingPage;
