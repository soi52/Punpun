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
  border-radius: 25px;
  border: none;
  background-color: #e7e6f2;
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
        console.error(error);
      });
  }, [setPoint]);

  const formattedPoint = point.toLocaleString();

  return (
    <>
      <PointDiv>
        <h3>현재 포인트</h3>
        <PointDetail>
          <span>{formattedPoint} P</span>
          {menuItems.map((menuItem, index) =>
            index === 3 ? (
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
            ) : (
              ''
            )
          )}
        </PointDetail>
      </PointDiv>
    </>
  );
};

export default SuSidebarContent;
