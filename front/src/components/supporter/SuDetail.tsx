import styled from 'styled-components';

import SuMainMessage from './SuMainMessage';
import SupportHistory from './SupportHistroy';

const ComponentStyle = styled.div`
  padding: 20px;
`;

function SuDetail() {
  return (
    <ComponentStyle>
      <SuMainMessage />
      <h2>후원내역</h2>
      <SupportHistory />
    </ComponentStyle>
  );
}

export default SuDetail;
