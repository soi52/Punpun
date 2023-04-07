import Carousel from '../components/main/Carousel';
import API from '../store/API';
import styled from 'styled-components';

const CarouselDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 70%;
`;

const TestCopy = () => {
  const apiRequest = () => {
    API.get('stores/test')
      .then((response: any) => {
        // console.log(response.data);
      })
      .catch((error: any) => {
        // console.error(error);
      });
  };

  return (
    <>
      <button onClick={apiRequest}>버튼</button>
      <div>테스트페이지</div>
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>
    </>
  );
};

export default TestCopy;
