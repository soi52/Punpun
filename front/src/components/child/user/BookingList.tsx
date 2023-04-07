import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
import PrevBookings from './PrevBookings';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingDiv = styled.div`
  padding-top: 20px;
`;

const BookingList = () => {

  return (
    <ComponentStyle>
      <ChMainMessage/>
      <BookingDiv>
        <PrevBookings/>
      </BookingDiv>
    </ComponentStyle>
  );
};

export default BookingList;
