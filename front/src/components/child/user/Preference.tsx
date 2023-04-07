import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
import LikedMenu from './LikedMenu';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingDiv = styled.div`
  padding-top: 20px;
`;

const Preference = () => {
  return (
    <ComponentStyle>
      <ChMainMessage/>
      <BookingDiv>
        <h2>선호 메뉴</h2>
        <LikedMenu/>
      </BookingDiv>
    </ComponentStyle>
  );
};

export default Preference;
