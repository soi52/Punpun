import styled from 'styled-components';
import first from '../../resources/images/main1.jpg';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  background: url(${first}) no-repeat center;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  background-size: cover;
`;

const TitleStyle = styled.h2`
  margin: auto;
  text-align: center;
`;

function FirstComponent() {
  return (
    <ComponentStyle>
      <Fade duration={1000}>
        <TitleStyle>First Component</TitleStyle>
      </Fade>
    </ComponentStyle>
  );
}

export default FirstComponent;
