import { useEffect } from 'react';
import API from '../store/API';

const TestCopy = () => {
  const apiClient = API();

  const apiRequest = () => {
    apiClient
      .get('api/stores/test')
      .then((response: any) => {
        console.log(response.data);
        console.log('성공');
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <>
      <button onClick={apiRequest}>버튼</button>
      <div>테스트페이지</div>
    </>
  );
};

export default TestCopy;
