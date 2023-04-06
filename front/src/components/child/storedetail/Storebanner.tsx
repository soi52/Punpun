import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';
import defaultImage from '../../../resources/images/profileDefault.png';
import bannerImage from '../../../resources/images/bannerImage.jpg';
import supportbadge from '../../../resources/images/support-badge.png';
import sharebadge from '../../../resources/images/share_badge.png';

const BannerDiv = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 25px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  background-size: cover;
  position: relative;
  margin: 0px 0px 20px 0px;
  overflow: hidden;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: -50px; /* BannerDiv보다 위에 위치 */
  left: 35%;
  height: 800px; /* 사다리꼴의 높이 */
  width: 200%;
  // background: #D9DDE9;
  background: rgba(150, 160, 191, 1);
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.1);
  transform: skewY(60deg) translateX(-50%);
  transform-origin: left top;
  z-index: 1;
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%; /* 수직 중앙 정렬 */
  left: 50%; /* 수평 중앙 정렬 */
  color: #ffffff;
  transform: translate(-130%, -50%); /* 정 가운데 위치 */
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const MenuCardImage = styled.img`
  width: 120px;
  height: 120px;
  top: 20%;
  left: 80%;
  position: absolute;
  object-fit: cover;
  border-radius: 50%;
`;

const BannerImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const BannerImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

const StoreBanner = ({ storeName }: { storeName: string | undefined }) => {
  const selectedStore = useRecoilValue(selectedStoreState);
  console.log(selectedStore);
  

  return (
    <BannerDiv>
      <BannerOverlay />
      <BannerText>
        { selectedStore?.storeAlwaysShare ? <img src={sharebadge}/> : ''}
        <h1>{storeName}</h1>
      </BannerText>
      <BannerImageWrapper>
        <BannerImage src={bannerImage} alt="Banner Image" />
      </BannerImageWrapper>
      {/* <MenuCardImage
        src={selectedStore?.storeImage || defaultImage}
        alt="사진 없음."
      /> */}
    </BannerDiv>
  );
};

export default StoreBanner;
