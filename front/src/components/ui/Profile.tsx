import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addressState, userInfoState } from '../../store/atoms';
import profileImg from '../../resources/images/temp_profile.png';
import Address from '../auth/Address';
import { useEffect } from 'react';
import useGeolocation from '../../common/UseGeolocation';

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
  border: 0.5rem solid black;
`;

const ProImg = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: url(${profileImg}) no-repeat center;
  background-size: 100%;
`;

const InfoBox = styled.div`
  text-align: center;
  margin-top: 10px;
`;

// type Info = { name: string; region: string };

// const Dummydata: Info = {
//   name: 'jungeun',
//   region: '대한민국, 구미',
// };

function Profile() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  console.log(userInfo);

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
        setUserInfo((userInfo) => {
          return {
            ...userInfo,
            userLocation: _arr,
          };
        });
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  useEffect(() => {
    if (typeof location === 'object') {
      getAddr(latitude, longitude);
    }
  }, [location]);

  return (
    <div>
      <ProfileBox>
        <ImgBox id="profileimg">
          <ProImg />
        </ImgBox>
        <InfoBox>
          <span>
            {userInfo.userName} 님<br></br>
            {userInfo.userLocation}
          </span>
        </InfoBox>
      </ProfileBox>
    </div>
  );
}

export default Profile;
