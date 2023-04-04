import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';
import defaultImage from '../../../resources/images/profileDefault.png';

const BannerDiv = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 25px;
  // border: 10px solid #b4bbd2;
  background-color: #b4bbd2;
  background-size: 100%;
  position: relative;
  margin: 0px 0px 20px 0px;
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%; /* 수직 중앙 정렬 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translate(-50%, -50%); /* 정 가운데 위치 */
`;

const MenuCardImage = styled.img`
  width: 120px;
  height: 120px;
  top: 20%; /* 수직 중앙 정렬 */
  left: 15%; /* 수평 중앙 정렬 */
  position: absolute;
  object-fit: cover;
  border-radius: 50%;
`;

const StoreBanner = ({ storeName }: { storeName: string | undefined }) => {
  const selectedStore = useRecoilValue(selectedStoreState);
  return (
    <BannerDiv>
      <MenuCardImage
        src={selectedStore?.storeImage || defaultImage}
        alt="사진 없음."
      />
      <BannerText>
        <h1>{storeName}</h1>
      </BannerText>
    </BannerDiv>
  );
};

export default StoreBanner;
