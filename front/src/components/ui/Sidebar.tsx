import { ReactNode } from 'react';
import styled from 'styled-components';

type SidebarProps = {
  children: ReactNode;
};

const SidebarStyle = styled.div`
  background-color: #eff3f8;
  border-radius: 1rem;
  width: 13rem;
  height: 35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  margin-right: 20px;
  flex-direction: column;
  align-items: center;
`;

function Sidebar({ children }: SidebarProps) {
  return <SidebarStyle>{children}</SidebarStyle>;
}

export default Sidebar;
