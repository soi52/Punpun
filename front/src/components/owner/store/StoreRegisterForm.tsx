import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

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
  margin: 10px;
`;

const CheckBoxBox = styled.div`
    display: flex;
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

interface IFormValues {
  storeName: string;
  ownerName: string;
  phoneNumber: string;
  address: string;
  description: string;
  image: File | null;
}

const StoreRegisterForm = () => {
  const [formValues, setFormValues] = useState<IFormValues>({
    storeName: '',
    ownerName: '',
    phoneNumber: '',
    address: '',
    description: '',
    image: null,
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    setFormValues({ ...formValues, image: selectedImage });

    // Show preview of the selected image
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewImageElement = document.getElementById(
          'previewImage'
        ) as HTMLImageElement;
        previewImageElement.setAttribute('src', event.target?.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 폼 제출 코드
  };

  return (
    <Container id='container'>
      <FormStyle id='form' onSubmit={handleSubmit}>
        <InputBox>
          <ImgBox>
            {formValues.image ? (
              <PreviewImage id="previewImage" src="" />
            ) : (
              <NoImage>이미지 없음</NoImage>
            )}
          </ImgBox>
          <InputLabel>대표이미지 등록</InputLabel>
          <InputField
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </InputBox>
        <InputBox>
          <InputLabel>가게명</InputLabel>
          <InputField type="text" name="storeName" required />
        </InputBox>
        <InputBox>
          <InputLabel>주소</InputLabel>
          <InputField type="text" name="storeLocation" required />
        </InputBox>
        <InputBox>
          <InputLabel>전화번호</InputLabel>
          <InputField type="text" name="storePhoneNumber" required />
        </InputBox>
        <InputBox>
          <InputLabel>사업자 등록증 첨부</InputLabel>
          <InputField
            type="file"
            name="businessCertificate"
            accept="image/*"
            required
          />
        </InputBox>
        <CheckBoxBox>
          <InputLabel>항상 나눔하고 싶어요</InputLabel>
          <InputField
            type="checkbox"
            name="businessCertificate"
            accept="image/*"
            required
          />
        </CheckBoxBox>
        <span>결식아동들이 항상 예약을 요청할 수 있어요.</span>
      </FormStyle>
      <SubmitBox>
        <SubmitButton type="submit">등록하기</SubmitButton>
      </SubmitBox>
    </Container>
  );
};

export default StoreRegisterForm;
