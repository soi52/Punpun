import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainMessage from '../../ui/MainMessage';
import MainTitle from '../../ui/MainTitle';
import StoreInfo from '../StoreInfo';

const Wrapper = styled.div`
  padding: 20px;
`;

function StoreManage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <StoreInfo />
      <h2>가게 정보</h2>
      <button onClick={() => navigate('/owregister')}>수정하기</button>
    </Wrapper>
  );
}
export default StoreManage;
