import NumberForm from '../components/ui/NumberForm';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10%;
  background-color: #F3F3F3;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid transparent;
  transition: border-color 0.3s ease-out;
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const AddNumberPage = () => {
  return (
    <Container>
      <NumberForm />
    </Container>
  );
};

export default AddNumberPage;
