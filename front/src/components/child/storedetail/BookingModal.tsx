import React from "react";
import styled from "styled-components";

interface ModalProps {
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 32px;
  z-index: 1000;
  max-width: 80%;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ModalContent = styled.div`
  font-size: 16px;
`;

const YesButton = styled.button`
  border: none;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  color: #fff;
  font-size: 1em;
  font-weight: 500;
  transition: 0.3s;
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  //   display: block;
  margin: 5px;
  background-color: blue;
`;

const NoButton = styled.button`
  border: 1px solid blue;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  color: blue;
  font-size: 1em;
  font-weight: 500;
  transition: 0.3s;
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  //   display: block;
  margin: 5px;
  background-color: white;
`;

const BookingModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>예약할까요?</ModalTitle>
        <ModalContent>
          시간에 맞춰 방문 부탁드려요 :)
        </ModalContent>
        <NoButton onClick={onClose}>아니요</NoButton>
        <YesButton>네</YesButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default BookingModal;