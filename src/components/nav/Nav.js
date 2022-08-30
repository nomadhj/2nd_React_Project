import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import SearchModal from './components/SearchModal.js';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isShownSearchBar, setIsShownSearchBar] = useState(false);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem('token');

  const moveToPage = event => {
    const { innerText: name } = event.target;
    if (name === 'wantUS') navigate('/');
    if (name === '마이 페이지') navigate('/mypage');
    if (name === '이력서') {
      if (!isLogin) return;
      navigate('/resume');
    }
  };

  const checkLogin = () => {
    navigate('login');
  };

  const checkLogOut = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    alert('로그아웃 되었습니다!');
    navigate('/');
  };

  const searchBarHandler = () => {
    setIsShownSearchBar(prevState => !prevState);
  };

  useEffect(() => {
    token && setIsLogin(true);
  }, [token]);

  return (
    <NavWrapper>
      <NavContainer>
        <Mainbar>
          <Title onClick={moveToPage}>wantUS</Title>
        </Mainbar>
        <MenuListContainer>
          <MenuList onClick={moveToPage}>이력서</MenuList>
        </MenuListContainer>
        <NavRightContainer>
          <UserSection>
            <SearchIcon onClick={searchBarHandler} />
            {!isLogin && <Login onClick={checkLogin}>로그인</Login>}
            {isLogin && <Login onClick={checkLogOut}>로그아웃</Login>}
          </UserSection>
          <CompanyService onClick={moveToPage}>
            {isLogin ? '마이 페이지' : '기업 서비스'}
          </CompanyService>
        </NavRightContainer>
      </NavContainer>
      {isShownSearchBar && (
        <SearchModal
          isShownSearchBar={isShownSearchBar}
          setIsShownSearchBar={setIsShownSearchBar}
        />
      )}
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.div`
  position: fixed;
  top: 0%;
  width: 100%;
  border-bottom: 1px solid #e1e2e3;
  background-color: white;
  z-index: 9999;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 50px;
  max-width: 1060px;
`;

const Mainbar = styled.div`
  display: flex;
  flex: 1.5;
  font-size: 25px;
`;

const Title = styled.div`
  margin-left: 50px;
  font-weight: bold;
  cursor: pointer;
`;

const MenuListContainer = styled.ul`
  display: flex;
  flex: 5;
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.fontGray};
`;

const MenuList = styled.li`
  padding: 15px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2, 1.2);
    color: black;
  }
`;

const NavRightContainer = styled.div`
  display: flex;
  flex: 2.4;
`;

const UserSection = styled.div`
  display: flex;
  margin-top: 10px;
  padding-right: 20px;
  border-right: 1px solid #e1e2e3;
`;

const SearchIcon = styled(IoIosSearch)`
  margin-right: 10px;
  cursor: pointer;
`;

const Login = styled.div`
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const CompanyService = styled.div`
  line-height: 2;
  border: 1px solid #e1e2e3;
  border-radius: 15px;
  background-color: white;
  font-size: 12px;
  font-weight: 400;
  padding: 2px 5px;
  margin-top: 4px;
  margin-left: 20px;
  color: #666;
  cursor: pointer;
`;
