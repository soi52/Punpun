import styled from 'styled-components';

import MainTitle from '../../ui/MainTitle';
import MainMessage from '../../ui/MainMessage';
import StoreRegisterForm from './StoreRegisterForm';
import StoreInfo from '../StoreInfo';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const RegisterForm = styled.div`
  display: flex;
  justify-content: center;
`;

function StoreRegister() {
  return (
    <ComponentStyle>
      <h1>가맹점 등록</h1>
      <RegisterForm>
        <StoreRegisterForm />
      </RegisterForm>
    </ComponentStyle>
  );
}
export default StoreRegister;
