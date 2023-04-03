import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import { useRecoilState } from 'recoil';
import {
  MenuDTO,
  isUpdatedState,
  selectedStoreState,
} from '../../../store/atoms';

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
  font-weight: 600;
`;

const ModalBody = styled.div``;

const ModalButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
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

const ModalFooter = styled.div``;

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
                    <span>이미지를 선택해주세요</span>
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
          <ModalButton onClick={handleModalSubmit}>
            {mode === 'register' ? '등록하기' : '수정하기'}
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MenuModal;
