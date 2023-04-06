import { useState, ChangeEvent, useEffect } from 'react';
import styled, { css } from 'styled-components';
import StoreSearchModal from './StoreSearchModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Store,
  isRegisterState,
  isRegisterStoreState,
  selectedMyStoreState,
  userInfoState,
} from '../../../store/atoms';
import API from '../../../store/API';
import { useNavigate } from 'react-router-dom';

const redColor = 'rgba(140, 150, 181, 1)';
const transition = 'all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5)';
const maxWidth = '700px';
const minWidth = '500px';
const borderRadius = '40px';
const submitButtonBorderRadius = '60px';

const FormStyle = styled.form`
  position: relative;
  display: inline-block;
  max-width: ${maxWidth};
  min-width: ${minWidth};
  box-sizing: border-box;
  // padding: 30px 25px;
  background-color: white;
  border-radius: ${borderRadius};
  margin: 40px 0;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
`;

const TitleStyle = styled.h1`
  color: ${redColor};
  font-weight: 100;
  letter-spacing: 0.01em;
  margin: 0px 0px 35px 0px;
  text-transform: uppercase;
  text-align: center;
`;

const SubmitButton = styled.button`
  margin-top: 35px;
  background-color: white;
  border: 1px solid ${redColor};
  line-height: 0;
  font-size: 17px;
  display: inline-block;
  box-sizing: border-box;
  padding: 20px 15px;
  border-radius: ${submitButtonBorderRadius};
  color: ${redColor};
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: ${transition};

  &:hover,
  &:focus {
    color: white;
    background-color: ${redColor};
  }
`;

const InputBox = styled.div`
  position: relative;
  padding: 10px 0;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`;
const InputLabel = styled.label`
  transform-origin: left center;
  color: ${redColor};
  font-weight: 100;
  letter-spacing: 0.01em;
  font-size: 17px;
  box-sizing: border-box;
  padding: 10px 15px;
  display: block;
  position: absolute;
  pointer-events: none;
  transition: ${transition};
  z-index: 1;
`;

const InputField = styled.input`
  appearance: none;
  background-color: none;
  border: 1px solid ${redColor};
  line-height: 0;
  font-size: 17px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: ${submitButtonBorderRadius};
  color: ${redColor};
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: ${transition};

  &:focus {
    outline: none;
    background: ${redColor};
    color: white;
    margin-top: 40px;
  }

  &:valid {
    margin-top: 40px;
  }

  &:focus ~ label {
    transform: translate(5px, -30px);
  }

  &:valid ~ label {
    text-transform: uppercase;
    font-style: italic;
    transform: translate(5px, -30px);
  }

  &:not(:placeholder-shown) ~ label {
    /* 인풋박스가 비어있을 때 라벨을 다시 아래로 내려감 */
    transform: translate(5px, -30px);
  }

  &.hasValue ~ label {
    /* 인풋필드 값이 있으면 라벨에 active 클래스 추가 */
    margin-top: 40px;
  }
`;

const PreviewImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  border: 2px solid #8c96b5;
  color: #8c96b5;
`;

const NoImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  border: 2px solid #8c96b5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c96b5;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: #8c96b5;
`;

const CheckBoxBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckBox = styled.input`
  margin-right: 10px;
`;

const CheckBoxLabel = styled.label`
  font-size: 16px;
`;

const SearchButton = styled.div`
  margin-top: 10px;
  background-color: white;
  border: 1px solid ${redColor};
  line-height: 0;
  font-size: 15px;
  display: inline-block;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: 60px;
  color: ${redColor};
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: ${transition};

  &:hover,
  &:focus {
    color: white;
    background-color: ${redColor};
  }
`;

const StoreRegisterForm = () => {
  const [selectedMyStore, setSelectedMyStore] =
    useRecoilState(selectedMyStoreState);
  const [isRegister, setIsRegister] = useRecoilState(isRegisterState);
  const [isRegisterStore, setIsRegisterStore] =
    useRecoilState(isRegisterStoreState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [registerStore, setRegisterStore] = useState<Store>({
    storeId: 0,
    storeName: '',
    storeOpenTime: null,
    storeInfo: null,
    storeAddress: '',
    storeLon: 0,
    storeLat: 0,
    storeImageName: null,
    storeImage: null,
    storePhoneNumber: null,
    storeAlwaysShare: false,
    menuDTO: [],
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMyStore) {
      API.get(`stores/${selectedMyStore?.storeId}`)
        .then((response: any) => {
          console.log(response.data);
          console.log(isRegister);
          setRegisterStore(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [selectedMyStore]);

  const handleSearch = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 폼 제출 코드
  };

  const handleRegister = () => {
    API.post(`stores/${registerStore?.storeId}`, {
      storeId: registerStore?.storeId,
    })
      .then((response: any) => {
        setIsRegisterStore(true);
        setSelectedMyStore(null);
        setIsRegister(false);
        API.get('users/member')
          .then((response: any) => {
            console.log(response.data.role);
            localStorage.setItem('role', response.data.role);
            setUserInfo(response.data);
          })
          .catch((error: any) => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        console.error(error);
      });
    navigate('/owstorelist');
  };

  return (
    <FormStyle id="form" onSubmit={handleSubmit}>
      <TitleStyle>가맹점 등록</TitleStyle>
      <InputBox className="InputBox">
        <ImgBox>
          {registerStore?.storeImage ? (
            <PreviewImage id="previewImage" src="" />
          ) : (
            <NoImage>이미지 없음</NoImage>
          )}
        </ImgBox>
      </InputBox>
      <SearchButton onClick={handleSearch}>가게명 검색</SearchButton>
      {showModal && <StoreSearchModal onClose={handleCloseModal} />}
      <InputBox className="InputBox">
        <InputLabel>가게명</InputLabel>
        <InputField
          type="text"
          name="storeName"
          value={registerStore?.storeName}
          readonly
        />
      </InputBox>
      <InputBox className="InputBox">
        <InputLabel htmlFor="storeLocation">주소</InputLabel>
        <InputField
          type="text"
          id="storeLocation"
          name="storeLocation"
          value={registerStore?.storeAddress}
          readonly
        />
      </InputBox>
      <InputBox className="InputBox">
        <InputLabel htmlFor="storePhoneNumber">전화번호</InputLabel>
        <InputField
          type="text"
          id="storePhoneNumber"
          name="storePhoneNumber"
          value={registerStore?.storePhoneNumber ?? ''}
          readonly
        />
      </InputBox>
      <InputBox className="InputBox">
        <InputLabel htmlFor="storeInfo">가게 설명</InputLabel>
        <InputField
          type="text"
          id="storeInfo"
          name="storeInfo"
          value={registerStore?.storeInfo ?? ''}
          readonly
        />
      </InputBox>
      {/* <InputBox>
          <InputLabel>사업자 등록증 첨부</InputLabel>
          <InputField
            type="file"
            name="businessCertificate"
            accept="image/*"
            required
          />
        </InputBox> */}
      <SubmitButton id="button" onClick={handleRegister}>
        등록하기
      </SubmitButton>
    </FormStyle>
  );
};

export default StoreRegisterForm;
