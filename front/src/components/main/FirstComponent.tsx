import styled from 'styled-components';
import useScrollFadeInPage from '../../pages/owner/useScrollFadeInPage';
import first from '../../resources/images/1.jpg';

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
  const { ref: ref1, style: style1 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });
  return (
    <ComponentStyle>
      <div ref={ref1} style={{ ...style1, opacity: 1 }}>
        <TitleStyle>First Component</TitleStyle>
      </div>
    </ComponentStyle>
  );
}

export default FirstComponent;
