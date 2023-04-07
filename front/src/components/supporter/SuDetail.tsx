import styled from 'styled-components';

import SuMainMessage from './SuMainMessage';
import SupportHistory from './SupportHistroy';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  padding-top: 20px;
`;

function SuDetail() {
  return (
    <ComponentStyle>
      <SuMainMessage />
      <Div>
        <h2>후원내역</h2>
        <SupportHistory />
      </Div>
    </ComponentStyle>
  );
}

export default SuDetail;
