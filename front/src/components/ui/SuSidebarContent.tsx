import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pointState } from '../../store/atoms';
import API from '../../store/API';

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
`;

const PointDiv = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const PointDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  font-size: 10px;
  font-weight: bold;
  color: black;
  border: none;
  background-color: #e7e6f2;
  line-height: 0;
  border-radius: 15px;
  letter-spacing: 0.01em;
  position: relative;
  transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);

  &:hover,
  &:focus {
    color: white;
    background-color: rgba(140, 150, 181, 1);
  }
`;

interface SuSidebarContentProps {
  menuItems: { title: string; component: FC }[];
  currentMenuItemIndex: number;
  onMenuItemClick: (index: number) => void;
}

const SuSidebarContent: FC<SuSidebarContentProps> = ({
  menuItems,
  currentMenuItemIndex,
  onMenuItemClick,
}) => {
  const [point, setPoint] = useRecoilState(pointState);

  useEffect(() => {
    API.get('payments')
      .then((response: any) => {
        setPoint(response.data.memberPoint);
      })
      .catch((error: any) => {
        // console.error(error);
      });
  }, [setPoint]);

  const formattedPoint = point.toLocaleString();

  return (
    <>
      <PointDiv>
        <h3>현재 포인트</h3>
        <PointDetail>
          <span>{formattedPoint} P</span>
          {menuItems.map((menuItem, index) => {
            if (window.location.href.includes('suuser')) {
              if (index === 2) {
                return (
                  <StyledLi
                    key={index}
                    onClick={() => onMenuItemClick(index)}
                    style={{
                      fontWeight:
                        currentMenuItemIndex === index ? 'bold' : 'normal',
                      cursor: 'pointer',
                    }}
                  >
                    <Button>{menuItem.title}</Button>
                  </StyledLi>
                );
              } else {
                return '';
              }
            } else {
              if (index === 3) {
                return (
                  <StyledLi
                    key={index}
                    onClick={() => onMenuItemClick(index)}
                    style={{
                      fontWeight:
                        currentMenuItemIndex === index ? 'bold' : 'normal',
                      cursor: 'pointer',
                    }}
                  >
                    <Button>{menuItem.title}</Button>
                  </StyledLi>
                );
              } else {
                return '';
              }
            }
          })}
        </PointDetail>
      </PointDiv>
    </>
  );
};

export default SuSidebarContent;
