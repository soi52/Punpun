import styled from 'styled-components';
import StoreRegisterForm from './StoreRegisterForm';
import { useRecoilValue } from 'recoil';
import { isRegisterState } from '../../../store/atoms';
import StoreUpdateForm from './StoreUpdateForm';

const ComponentStyle = styled.div`
  padding: 20px;
`;

function StoreRegister() {
  const isRegister = useRecoilValue(isRegisterState);

  return (
    <ComponentStyle>
      {isRegister ? <StoreRegisterForm /> : <StoreUpdateForm />}
    </ComponentStyle>
  );
}
export default StoreRegister;
