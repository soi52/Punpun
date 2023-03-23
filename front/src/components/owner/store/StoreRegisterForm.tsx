import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-top: 50px;
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
  width: 300px;
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

const SubmitBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #ffb347;
  border-radius: 5px;
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
    <Container>
      <FormStyle onSubmit={handleSubmit}>
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
      </FormStyle>
      <SubmitBox>
        <SubmitButton type="submit">등록하기</SubmitButton>
      </SubmitBox>
    </Container>
  );
};

export default StoreRegisterForm;
