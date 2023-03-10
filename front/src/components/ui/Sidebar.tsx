import styled from 'styled-components';

const SidebarStyle = styled.div`
  background-color: #eff3f8;
  border-radius: 1rem;
  width: 13rem;
  height: 35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  margin-right: 10px;
`;

function Sidebar() {
  return (
    <SidebarStyle>
      <h1>Sidebar</h1>
    </SidebarStyle>
  );
}

export default Sidebar;
