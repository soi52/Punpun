import styled from 'styled-components';

import MainTitle from '../../ui/MainTitle';
import MainMessage from '../../ui/MainMessage';
import StoreRegisterForm from './StoreRegisterForm';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const RegisterForm = styled.div`
  display: flex;
  justify-content: center;
`;

function StoreRegister() {
  const mainMessage = {
    title: '',
    ownerName: '박정은 사장님',
    message: 'PUNPUN의 가족이 되어보세요!',
    name: 'PUNPUN 가맹점 등록하기',
  };

  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage
        message={`${mainMessage.ownerName}, ${mainMessage.message}`}
      />
      <RegisterForm>
        <StoreRegisterForm />
      </RegisterForm>
    </ComponentStyle>
  );
}
export default StoreRegister;
