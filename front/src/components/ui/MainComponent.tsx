import styled from 'styled-components';

type MainComponentProps = {
  width: number;
};

const MainComponentStyle = styled.div<MainComponentProps>`
  background-color: #eff3f8;
  border-radius: 1rem;
  width: ${(props) => props.width + 'rem'};
  height: 35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
`;

function MainComponent(props: MainComponentProps) {
  return (
    <MainComponentStyle width={props.width}>
      <h1>MainComponent</h1>
    </MainComponentStyle>
  );
}

export default MainComponent;
