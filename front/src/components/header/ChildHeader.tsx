import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  margin: 30px;
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
