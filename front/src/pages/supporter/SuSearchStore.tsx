import styled from 'styled-components';
import SearchStore from '../../components/child/search/SearchStore';

const ComponentDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentDiv = styled.div`
  padding: 20px;
`;

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  width: 70%;
  margin: 30px;
  height: 70%;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  overflow-y: auto;
`;

function SuSearchStore() {
  return (
    <>
      <ComponentDiv>
        <BoxDiv>
          <h1>가게 찾기</h1>
          <h3>후원할 식당을 찾아보세요.</h3>
          <ContentDiv>
            <SearchStore />
          </ContentDiv>
        </BoxDiv>
      </ComponentDiv>
    </>
  );
}

export default SuSearchStore;
