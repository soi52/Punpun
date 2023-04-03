import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import StoreSearchModal from './StoreSearchModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  OwStoreUpdate,
  isUpdatedState,
  selectedStoreState,
  updatedStoreState,
} from '../../../store/atoms';
import API from '../../../store/API';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 50px;
  padding: auto;
`;

const InputBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;
`;

const InputField = styled.input`
  width: 40vw;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 5px;
  font-size: 14px;
  margin-right: 20px;
`;

const PreviewImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  border: 2px solid black;
`;

const NoImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  border: 2px solid black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: relative;
`;

const UploadIcon = styled.div`
  position: absolute;
  bottom: -5px;
  right: 5px;
  cursor: pointer;
  margin: 10px;
  display: inline-block; /* display 속성 추가 */
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

const SubmitBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #000000;
  border-radius: 25px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const StoreUpdateForm = () => {
  const selectedImageFile = useRef<File | null>(null);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const [updatedStore, setUpdatedStore] = useRecoilState(updatedStoreState);
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
      storeAlwaysShare: true,
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
    <Container id="container">
      <FormStyle id="form" onSubmit={handleSubmit}>
        <InputBox>
          <ImgBox>
            {selectedImageFile.current ? (
              <PreviewImage
                id="previewImage"
                src={URL.createObjectURL(selectedImageFile.current)}
              />
            ) : selectedStore?.storeImage ? (
              <PreviewImage id="previewImage" src={selectedStore?.storeImage} />
            ) : (
              <NoImage>이미지 없음</NoImage>
            )}
            <label htmlFor="uploadImage">
              <UploadIcon>
                <FontAwesomeIcon
                  icon={faImage}
                  size="2x"
                  style={{ color: 'lightgray' }}
                />
              </UploadIcon>
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
          <button onClick={handleSearch}>가게명 검색하기</button>
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
          <CheckBox
            type="checkbox"
            name="businessCertificate"
            accept="image/*"
            id="businessCertificate"
          />
          <CheckBoxLabel htmlFor="businessCertificate">
            항상 나눔하고 싶어요
          </CheckBoxLabel>
        </CheckBoxBox>
        <span>결식아동들이 항상 예약을 요청할 수 있어요.</span>
      </FormStyle>
      <SubmitBox>
        <SubmitButton onClick={handleUpdate}>등록하기</SubmitButton>
      </SubmitBox>
    </Container>
  );
};

export default StoreUpdateForm;
