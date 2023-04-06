import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import { useRecoilState } from 'recoil';
import { isUpdatedState, selectedStoreState } from '../../../store/atoms';

const redColor = 'rgba(140, 150, 181, 1)';
const transition = 'all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5)';
const maxWidth = '700px';
const minWidth = '500px';
const borderRadius = '40px';
const submitButtonBorderRadius = '60px';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${redColor};
  margin: 0px 0px 0px 0px;
`;

const ModalBody = styled.div``;

const ModalButton = styled.button`
  margin-top: 35px;
  margin-right: 20px;
  background-color: white;
  border: 1px solid #DCA9AC;
  line-height: 0;
  font-size: 15px;
  display: inline-block;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: ${submitButtonBorderRadius};
  color: #BC777B;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: ${transition};

  &:hover,
  &:focus {
    color: white;
    background-color: #DCA9AC;
  }
`;
const ModalButton2 = styled.button`
  margin-top: 35px;
  background-color: white;
  border: 1px solid #A3C5A7;
  line-height: 0;
  font-size: 15px;
  display: inline-block;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: ${submitButtonBorderRadius};
  color: #7BAB80;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: ${transition};

  &:hover,
  &:focus {
    color: white;
    background-color: #A3C5A7;
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

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface Menu {
  menuCount: number;
  menuId: number;
  menuImage: string;
  menuImageName: string;
  menuName: string;
  menuPrice: number;
}

interface MenuModalProps {
  onClose: () => void;
  mode: 'register' | 'update'; // mode 속성 추가
  menu?: Menu; // menu 속성 추가
}

function MenuModal({ onClose, mode, menu }: MenuModalProps) {
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const selectedImageFile = useRef<File | null>(null);

  useEffect(() => {
    if (menu?.menuImage) {
      setPreviewImage(menu.menuImage);
    }
  }, [menu]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      selectedImageFile.current = selectedFile;
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleModalSubmit = () => {
    const menuRegist = {
      storeId: selectedStore?.storeId,
      menuName: (document.getElementsByName('menuName')[0] as HTMLInputElement)
        .value,
      menuPrice: (
        document.getElementsByName('menuPrice')[0] as HTMLInputElement
      ).value,
    };

    const menuUpdate = {
      menuId: menu?.menuId ?? '',
      menuName: (document.getElementsByName('menuName')[0] as HTMLInputElement)
        .value,
      menuPrice: (
        document.getElementsByName('menuPrice')[0] as HTMLInputElement
      ).value,
    };

    if (mode === 'update' && menu) {
      const formData = new FormData();
      if (selectedImageFile.current) {
        formData.append('menuImage', selectedImageFile.current);
      }
      formData.append(
        'menuUpdate',
        new Blob([JSON.stringify(menuUpdate)], { type: 'application/json' })
      );

      API.put(`stores/menu/${menu?.menuId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response: any) => {
          setIsUpdated(!isUpdated);
          console.log(mode === 'update' ? '메뉴 수정 완료' : '메뉴 등록 완료');
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      const formData = new FormData();
      if (selectedImageFile.current) {
        formData.append('menuImage', selectedImageFile.current);
      }
      formData.append(
        'menuRegist',
        new Blob([JSON.stringify(menuRegist)], { type: 'application/json' })
      );

      API.post('stores/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response: any) => {
          setIsUpdated(!isUpdated);
          console.log(
            mode === 'register' ? '메뉴 등록 완료' : '메뉴 수정 완료'
          );
        })
        .catch((error: any) => {
          console.error(error);
        });
    }

    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {mode === 'register' ? '메뉴 등록하기' : '메뉴 수정하기'}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <InputBox>
            <ImgBox>
              <label htmlFor="menuImage">
                {previewImage ? (
                  <PreviewImage src={previewImage} alt="메뉴 이미지 미리보기" />
                ) : (
                  <NoImage>
                    <span>이미지 선택</span>
                  </NoImage>
                )}
              </label>
              <InputField
                id="menuImage"
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
            <InputLabel>메뉴 이름</InputLabel>
            <InputField
              type="text"
              name="menuName"
              placeholder="메뉴 이름 입력"
              defaultValue={menu?.menuName}
            />
          </InputBox>
          <InputBox>
            <InputLabel>가격</InputLabel>
            <InputField
              type="number"
              name="menuPrice"
              placeholder="가격 입력"
              defaultValue={menu?.menuPrice}
            />
          </InputBox>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ModalButton2 onClick={handleModalSubmit}>
            {mode === 'register' ? '등록' : '수정'}
          </ModalButton2>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MenuModal;
