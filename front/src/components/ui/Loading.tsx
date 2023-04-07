import React from 'react';
import styled from 'styled-components';
import SpinnerIMG from '../../resources/images/Spinner.gif';

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  background-image: url(${SpinnerIMG}) no-repeat center;
`;

const Loading = () => {
  return (
    <LoadingDiv>
      <Spinner />
    </LoadingDiv>
  );
};

export default Loading;
