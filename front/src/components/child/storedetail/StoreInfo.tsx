import styled from 'styled-components';
import Map from '../../../common/Map';

import StoreBanner from './Storebanner';

const StoreInfo = () => {
  return (
    <>
      <StoreBanner />
      <h2>가게 정보</h2>
      <Map latitude={36.1083353} longitude={128.4181418} />
    </>
  );
};

export default StoreInfo;
