import styled from 'styled-components';
import StoreRegisterForm from './StoreRegisterForm';
import { useRecoilValue } from 'recoil';
import { isRegisterState } from '../../../store/atoms';
import StoreUpdateForm from './StoreUpdateForm';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const RegisterForm = styled.div`
  display: flex;
  justify-content: center;
`;

function StoreRegister() {
  const isRegister = useRecoilValue(isRegisterState);
  console.log(isRegister);
  const pageTitle = isRegister ? '가맹점 등록' : '가맹점 정보 수정';

  return (
    <ComponentStyle>
      <h1>{isRegister ? '가맹점 등록' : '가맹점 정보 수정'}</h1>
      <RegisterForm>
        {isRegister ? <StoreRegisterForm /> : <StoreUpdateForm />}
      </RegisterForm>
    </ComponentStyle>
  );
}
export default StoreRegister;
