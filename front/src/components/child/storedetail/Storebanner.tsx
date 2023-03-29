import styled from 'styled-components';
import StoreBannerIMG from '../../../resources/images/store_banner.jpg';

const BannerDiv = styled.div`
  width: 70%;
  height: 30%;
  margin: 10px auto;
  border-radius: 25px;
  background: url(${StoreBannerIMG}) no-repeat center;
  background-size: 100%;
  position: relative;
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%; /* 수직 중앙 정렬 */
  left: 25%; /* 수평 중앙 정렬 */
  transform: translate(-50%, -50%); /* 정 가운데 위치 */
`;

const StoreBanner = ({ storeName }: { storeName: string | undefined }) => {
  return (
    <BannerDiv>
      <BannerText>
        <h1>{storeName}</h1>
      </BannerText>
    </BannerDiv>
  );
};

export default StoreBanner;
