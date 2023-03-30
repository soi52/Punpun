import React, { useState } from 'react';
import API from '../../../store/API';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    // transform: scale(0.5);
    opacity: 0;
  }

  to {
    // transform: scale(1);
    opacity: 1;
  }
`;

interface menu {
  id: number;
  title: string;
  price: number;
}

interface ModalProps {
  menu: menu;
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
  animation: ${fadeIn} 0.3s ease-out;

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
  width: 70px;
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
  width: 70px;
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

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  margin-left: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const BookingModal: React.FC<ModalProps> = ({ menu, onClose }) => {
  const [thirtyminutes, setThirtyminutes] = useState(true);
  const [hour, setHour] = useState(false);

  const handleThirtyMinutes = () => {
    setThirtyminutes(!thirtyminutes);
    setHour(false);
  };

  const handleHour = () => {
    setHour(!hour);
    setThirtyminutes(false);
  };

  // 현재 시각
  const now = new Date();

  // 30분 뒤 또는 1시간 뒤의 시각
  const formattedTime = new Date();
  if (thirtyminutes) {
    formattedTime.setMinutes(now.getMinutes() + 30);
  } else if (hour) {
    formattedTime.setHours(now.getHours() + 1);
  }

  // 예약 날짜 및 시각
  const year = formattedTime.getFullYear();
  const month = ("00" + (formattedTime.getMonth() + 1)).slice(-2);
  const day = ("00" + formattedTime.getDate()).slice(-2);
  const hours = ("00" + formattedTime.getHours()).slice(-2);
  const minutes = ("00" + formattedTime.getMinutes()).slice(-2);
  const seconds = ("00" + formattedTime.getSeconds()).slice(-2);
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
  function handleBooking() {
    // 선택한 checkbox 데이터와 menu 데이터를 담아서 서버로 보낸다.
    API.post('bookings', {
      menuId:menu.id,
      reservationTime: formattedDate
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data.message)
    });
  
    // axios.post('https://j8d109.p.ssafy.io/api/bookings', {
    //   data: data,
    //   withCredentials: true,
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    // })
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>예약할까요?</ModalTitle>
        <ModalContent>
          시간에 맞춰 방문 부탁드려요 :)
          <CheckboxWrapper>
            <CheckboxLabel>
              30분 뒤 방문
              <CheckboxInput
                type="checkbox"
                checked={thirtyminutes}
                onChange={handleThirtyMinutes}
              />
            </CheckboxLabel>
            <CheckboxLabel>
              1시간 뒤 방문
              <CheckboxInput
                type="checkbox"
                checked={hour}
                onChange={handleHour}
              />
            </CheckboxLabel>
          </CheckboxWrapper>
        </ModalContent>
        <ModalButton>
          <NoButton onClick={onClose}>아니요</NoButton>
          <YesButton onClick={handleBooking}>네</YesButton>
        </ModalButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default BookingModal;
