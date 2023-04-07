import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  position: relative;
  margin: 30px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #5D5A88;
    transition: width 0.3s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }

  &:not(:hover)::before {
    right: 0;
    left: auto;
  }
`;

function ChildHeader(props: any) {
  const navigate = useNavigate();

  const toChMain = () => {
    navigate('/chmain');
  };

  const toMyPage = () => {
    navigate('/chuser');
  };

  return (
    <NavUl>
      <NavLi onClick={toChMain}>가게찾기</NavLi>
      <NavLi onClick={toMyPage}>마이페이지</NavLi>
      <NavLi onClick={props.onLogout}>로그아웃</NavLi>
    </NavUl>
  );
}

export default ChildHeader;
