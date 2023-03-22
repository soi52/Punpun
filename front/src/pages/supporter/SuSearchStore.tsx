import styled from 'styled-components';
import SearchStore from '../../common/SearchStore';

const ComponentDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentDiv = styled.div`
  padding: 20px;
`;

function SuSearchStore() {
  return (
    <>
      <ComponentDiv>
        <h1>가게 찾기</h1>
        <h3>후원할 식당을 찾아보세요.</h3>
        <ContentDiv>
          <SearchStore />
        </ContentDiv>
      </ComponentDiv>
    </>
  );
}

export default SuSearchStore;
