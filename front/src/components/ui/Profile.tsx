import styled from 'styled-components';
import profileImg from '../../resources/images/temp_profile.png';

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

type Info = { name: string; region: string };

const Dummydata: Info = {
  name: 'jungeun',
  region: '대한민국, 구미',
};

function Profile() {
  return (
    <div>
      <ProfileBox>
        <ImgBox id="profileimg">
          <ProImg />
        </ImgBox>
        <InfoBox>
          <span>
            {Dummydata.name}님<br></br>
            {Dummydata.region}
          </span>
        </InfoBox>
      </ProfileBox>
    </div>
  );
}

export default Profile;
