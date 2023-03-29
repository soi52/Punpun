import styled from 'styled-components';

import SuMainMessage from './SuMainMessage';
import MessageForSupport from './MessageForSupport';

const ComponentStyle = styled.div`
  padding: 20px;
`;

function ThanksMessage() {

  return (
    <ComponentStyle>
      <SuMainMessage/>
      <h2>감사 메세지</h2>
      <MessageForSupport/>
    </ComponentStyle>
  );
}

export default ThanksMessage;
