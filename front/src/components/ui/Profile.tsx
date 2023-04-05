import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isOwnerState,
  selectedStoreState,
  userAreaState,
  UserInfo,
  userInfoState,
} from '../../store/atoms';
// import profileImg from '../../resources/images/temp_profile.png';
import { useEffect } from 'react';
import API from '../../store/API';
import useGeolocation from '../../common/UseGeolocation';
import DefaultStoreImage from '../../resources/images/profileDefault.png';

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ImgBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  // border: 2px solid;
  // border-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%);
  // border-image-slice: 1;
  &:hover {
  }
`;

interface ProImgProps {
  imgSrc: string;
}

const ProImg = styled.div<ProImgProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${({ imgSrc }) => `url(${imgSrc})`} no-repeat center;
  background-size: 100%;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const InfoBox = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const storeImage = '이미지 파일 경로';

function Profile() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userArea, setUserArea] = useRecoilState(userAreaState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const isOwner = useRecoilValue(isOwnerState);
  const profileImage = isOwner
    ? selectedStore?.storeImage || DefaultStoreImage
    : userInfo.userProfileImage;

  const role = localStorage.getItem('role');

  const location = useGeolocation();
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  function getAddr(lat: any, lng: any) {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr =
          arr[0].address.region_1depth_name +
          ' ' +
          arr[0].address.region_2depth_name;
        setUserArea(_arr);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  useEffect(() => {
    if (typeof location === 'object') {
      getAddr(latitude, longitude);
    }
  }, [getAddr]);

  useEffect(() => {
    if (role === 'CHILD') {
      API.get('users/child')
        .then((response: any) => {
          console.log(response.data);
          // API 요청에서 받아온 데이터를 memberInfoState에 업데이트
          const newUserInfo: UserInfo = {
            userId: response.data.id,
            userName: response.data.name,
            userEmail: response.data.email,
            userRole: response.data.role,
            userNumber: response.data.phoneNumber,
            userSupportedPoint: null,
            userRemainPoint: null,
            userArea: response.data.area,
            userProfileName: response.data.profileName,
            userProfileImage: response.data.profileImage,
          };
          setUserInfo(newUserInfo);
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      API.get('users/member')
        .then((response: any) => {
          // console.log(response.data);
          // API 요청에서 받아온 데이터를 memberInfoState에 업데이트
          const newUserInfo: UserInfo = {
            userId: response.data.id,
            userName: response.data.name,
            userEmail: response.data.email,
            userRole: response.data.role,
            userNumber: response.data.phoneNumber,
            userSupportedPoint: response.data.supportedPoint,
            userRemainPoint: response.data.remainPoint,
            userArea: null,
            userProfileName: response.data.profileName,
            userProfileImage: response.data.profileImage,
          };
          setUserInfo(newUserInfo);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [setUserInfo]);

  return (
    <div>
      <ProfileBox>
        <ImgBox id="profileimg">
          <ProImg imgSrc={profileImage} />
        </ImgBox>
        <InfoBox>
          <span>
            {userInfo.userName} 님<br></br>
            {userArea}
          </span>
        </InfoBox>
      </ProfileBox>
    </div>
  );
}

export default Profile;
