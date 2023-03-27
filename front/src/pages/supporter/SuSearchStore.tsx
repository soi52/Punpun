import styled from 'styled-components';
import MainComponent from '../../components/ui/MainComponent';
import SearchStore from '../../common/SearchStore';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const SearchStoreDiv = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding-top: 20px;
`;

const ComponentDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentDiv = styled.div`
  // padding: 20px;
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
    <ComponentStyle>
      <MainComponent width={68}>{<SearchStore message={'후원할 식당을 찾아보세요.'}/>}</MainComponent>
    </ComponentStyle>
  );
}

export default SuSearchStore;
