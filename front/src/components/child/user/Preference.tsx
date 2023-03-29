import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
import LikedMenu from './LikedMenu';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const Preference = () => {
  return (
    <ComponentStyle>
      <ChMainMessage/>
      <h2>선호 메뉴</h2>
      <LikedMenu/>
    </ComponentStyle>
  );
};

export default Preference;
