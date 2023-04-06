import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Store, owStoreState, selectedStoreState } from '../../store/atoms';
import UserTypeSelector from './UserTypeSelector';

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
    background-color: #5d5a88;
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

const StoreDropdown = styled.ul<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  display: none;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 1px 0px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  display: block;
`;

const StoreDropdownItem = styled.li`
  display: block;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 0.4rem;
  transition: all 200ms linear;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #5d5a88;
    border-radius: 0.4rem;
  }
`;

interface OwnerHeaderProps {
  toOwStore: () => void;
  onLogout: () => void;
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string | undefined;
  role: string;
}

interface OwnerHeaderProps {
  toOwStore: () => void;
  onLogout: () => void;
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string | undefined;
  role: string;
}

function OwnerHeader(props: OwnerHeaderProps) {
  const [stores, setStores] = useRecoilState(owStoreState);
  const [selectedStore, setSelectedStore] = useRecoilState<null | Store>(
    selectedStoreState
  );
  const [storeDrop, setStoreDrop] = useState(false);
  const { onLogout, toOwStore, onSelect, items, selectedItem, role } = props;

  const navigate = useNavigate();

  useEffect(() => {}, [selectedStore]);

  const toOwBooking = () => {
    navigate(`/owstore/${selectedStore?.storeId ?? ''}/booking`);
  };

  const selectStore = (store: Store | null) => {
    setSelectedStore(store);
    setStoreDrop(true);
    setTimeout(() => {
      if (!store) {
        navigate(`/owstore/${stores[0].storeId}`);
      } else {
        navigate(`/owstore/${store.storeId}`);
      }
    });
  };

  return (
    <NavUl>
      <NavLi
        onClick={() => setStoreDrop(!storeDrop)}
        onMouseEnter={() => setStoreDrop(true)}
        onMouseLeave={() => setStoreDrop(false)}
      >
        {selectedStore?.storeName ?? '가게 선택'}
        {storeDrop && (
          <StoreDropdown show={storeDrop}>
            {stores.map((store) => (
              <StoreDropdownItem
                key={store.storeId}
                onClick={() => selectStore(store)}
              >
                {store.storeName}
              </StoreDropdownItem>
            ))}
            <hr />
            <StoreDropdownItem onClick={() => navigate('/owstorelist')}>
              전체 가게 관리
            </StoreDropdownItem>
          </StoreDropdown>
        )}
      </NavLi>
      <NavLi onClick={toOwStore}>가게운영</NavLi>
      <NavLi onClick={toOwBooking}>예약관리</NavLi>
      <NavLi onClick={onLogout}>로그아웃</NavLi>
      <UserTypeSelector
        onSelect={onSelect}
        items={items}
        selectedItem={selectedItem}
        role={role}
      />
    </NavUl>
  );
}

export default OwnerHeader;
