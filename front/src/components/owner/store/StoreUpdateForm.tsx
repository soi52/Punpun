import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import StoreSearchModal from './StoreSearchModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isUpdatedState,
  selectedStoreState,
  updatedStoreState,
} from '../../../store/atoms';
import API from '../../../store/API';
import { useNavigate } from 'react-router-dom';
import { OwStoreUpdate } from '../../../store/types';

const redColor = '#8088A2';
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
  font-weight: 300;
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
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: 17px;
  box-sizing: border-box;
  padding: 10px 15px;
  display: block;
  position: absolute;
  margin-top: -10px;
  pointer-events: none;
  transition: ${transition};
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
    margin-top: 30px;
  }

  &:valid {
    margin-top: 30px;
  }

  &:focus ~ label {
    transform: translate(0, -35px);
  }

  &:valid ~ label {
    text-transform: uppercase;
    font-style: italic;
    transform: translate(5px, -35px);
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
  margin: 15px 0px 10px 5px;
`;

const CheckBox = styled.input`
  margin-right: 10px;
`;

const CheckBoxTitle = styled.h6`
  font-size: 15px;
  font-weight: 100;
  text-align: start;
  margin: 0px 0px 0px 5px;
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

const StoreUpdateForm = () => {
  const selectedImageFile = useRef<File | null>(null);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const [updatedStore, setUpdatedStore] = useRecoilState(updatedStoreState);
  const [isAlwaysShare, setIsAlwaysShare] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage && selectedImage.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const storeImageFile = selectedImage;
        selectedImageFile.current = storeImageFile;
        setUpdatedStore(selectedStore);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      alert('이미지 파일을 선택해주세요.');
      event.target.value && (event.target.value = '');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUpdate = () => {
    const updatedStoreInfo: OwStoreUpdate = {
      ...updatedStore!,
      storeId: updatedStore?.storeId || 0,
      storeName: (
        document.getElementsByName('storeName')[0] as HTMLInputElement
      ).value,
      storeAddress: (
        document.getElementsByName('storeLocation')[0] as HTMLInputElement
      ).value,
      storePhoneNumber: (
        document.getElementsByName('storePhoneNumber')[0] as HTMLInputElement
      ).value,
      storeInfo: (
        document.getElementsByName('storeInfo')[0] as HTMLInputElement
      ).value,
      storeOpenTime: (
        document.getElementsByName('storeOpenTime')[0] as HTMLInputElement
      ).value,
      storeAlwaysShare: isAlwaysShare,
    };

    const formData = new FormData();
    if (selectedImageFile.current) {
      formData.append('storeImage', selectedImageFile.current);
      console.log(selectedImageFile.current);
    }
    formData.append(
      'storeInfo',
      new Blob([JSON.stringify(updatedStoreInfo)], { type: 'application/json' })
    );

    API.put(`stores/${selectedStore?.storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response: any) => {
        setIsUpdated(!isUpdated);
        navigate(`/owstore/${selectedStore?.storeId}`);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <FormStyle id="form" onSubmit={handleSubmit}>
      <TitleStyle>가맹점 정보 수정</TitleStyle>
      <InputBox>
        <ImgBox>
          <label htmlFor="uploadImage">
            {selectedImageFile.current ? (
              <PreviewImage
                id="previewImage"
                src={URL.createObjectURL(selectedImageFile.current)}
              />
            ) : selectedStore?.storeImage ? (
              <PreviewImage id="previewImage" src={selectedStore?.storeImage} />
            ) : (
              <NoImage>
                <span>이미지 선택</span>
              </NoImage>
            )}
          </label>
          <InputField
            id="uploadImage"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              opacity: 0,
              position: 'absolute',
              top: '-9999px',
              left: '-9999px',
            }}
          />
        </ImgBox>
      </InputBox>
      <InputBox>
        <InputLabel>가게명</InputLabel>
        <InputField
          type="text"
          name="storeName"
          defaultValue={selectedStore?.storeName}
        />
        <SearchButton onClick={handleSearch}>가게명 검색</SearchButton>
      </InputBox>
      {showModal && <StoreSearchModal onClose={handleCloseModal} />}
      <InputBox>
        <InputLabel>주소</InputLabel>
        <InputField
          type="text"
          name="storeLocation"
          defaultValue={selectedStore?.storeAddress}
        />
      </InputBox>
      <InputBox>
        <InputLabel>전화번호</InputLabel>
        <InputField
          type="text"
          name="storePhoneNumber"
          defaultValue={selectedStore?.storePhoneNumber ?? ''}
        />
      </InputBox>
      <InputBox>
        <InputLabel>가게 설명</InputLabel>
        <InputField
          type="text"
          name="storeInfo"
          defaultValue={selectedStore?.storeInfo ?? ''}
        />
      </InputBox>
      <InputBox>
        <InputLabel>오픈시간</InputLabel>
        <InputField
          type="text"
          name="storeOpenTime"
          defaultValue={selectedStore?.storeOpenTime ?? ''}
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
      <CheckBoxBox>
        <CheckBoxLabel htmlFor="storeAlwaysShare">
          항상 나눔하고 싶어요
        </CheckBoxLabel>
        <CheckBox
          type="checkbox"
          name="storeAlwaysShare"
          accept="image/*"
          defaultChecked={selectedStore?.storeAlwaysShare ? true : false}
          checked={isAlwaysShare}
          onChange={(e) => setIsAlwaysShare(e.target.checked)}
        />
      </CheckBoxBox>
      <CheckBoxTitle>결식 아동들이 항상 예약을 요청할 수 있어요.</CheckBoxTitle>
      <SubmitButton id="button" onClick={handleUpdate}>
        수정하기
      </SubmitButton>
    </FormStyle>
  );
};

export default StoreUpdateForm;
