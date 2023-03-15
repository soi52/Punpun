import styled from 'styled-components';

import StoreBanner from './Storebanner';

const StoreBannerDiv = styled.div`
    width: 50rem;
`;

const StoreInfo = () => {
  return (
    <>
      <StoreBannerDiv>
        <StoreBanner />
      </StoreBannerDiv>
    </>
  );
};

export default StoreInfo;
