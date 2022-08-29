import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosSearch } from 'react-icons/io';
import SearchModal from './components/SearchModal.js';
import DropMenu from './DropMenu.js';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [dropMenu, setDropMenu] = useState(false);
  const [isShownSearchBar, setIsShownSearchBar] = useState(false);
  const navigate = useNavigate();
  const modalEl = useRef();

  const [isLogin, setIsLogin] = useState(false);
  const wantToken = localStorage.getItem('token');

  useEffect(() => {
    wantToken && setIsLogin(true);
  }, [wantToken]);

  const showDropMenu = () => {
    setDropMenu(!dropMenu);
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  const goToLikepage = () => {
    navigate('/likepage');
  };

  const goToResume = () => {
    navigate('/resume');
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

  const closeDropMenu = useCallback(
    e => {
      e.stopPropagation();
      if (dropMenu && !modalEl.current.contains(e.target)) {
        setDropMenu(false);
      }
    },
    [dropMenu]
  );

  useEffect(() => {
    window.addEventListener('click', closeDropMenu);
    return () => {
      window.removeEventListener('click', closeDropMenu);
    };
  }, [closeDropMenu, dropMenu]);

  const GLOBAL_NAV = [
    { id: 1, content: '채용' },
    { id: 2, content: '이벤트' },
    { id: 3, content: '직군별 연봉' },
    { id: 4, content: '이력서', functional: goToResume },
    { id: 5, content: '커뮤니티' },
    { id: 6, content: '프리랜서' },
  ];

  return (
    <>
      <NavWrapper>
        <NavContainer>
          <Mainbar>
            <HamburgerBar onClick={showDropMenu} ref={modalEl}>
              <GiHamburgerMenu />
            </HamburgerBar>
            <Title onClick={goToMain}>wantUS</Title>
          </Mainbar>
          <MenuListContainer>
            {GLOBAL_NAV.map(({ content, id, functional }) => {
              return (
                <MenuList key={id} onClick={functional}>
                  {content}
                </MenuList>
              );
            })}
          </MenuListContainer>
          <NavRightContainer>
            <UserSection>
              <SearchIcon
                onClick={() => {
                  setIsShownSearchBar(true);
                }}
              />
              {!isLogin && <Login onClick={checkLogin}>로그인</Login>}
              {isLogin && <Login onClick={checkLogOut}>로그아웃</Login>}
            </UserSection>
            <CompanyService onClick={goToMypage}>
              {isLogin ? '마이 페이지' : '기업 서비스'}
            </CompanyService>
            {isLogin && (
              <CompanyService onClick={goToLikepage}>Follow</CompanyService>
            )}
          </NavRightContainer>
        </NavContainer>
        {isShownSearchBar && (
          <SearchModal
            isShownSearchBar={isShownSearchBar}
            setIsShownSearchBar={setIsShownSearchBar}
          />
        )}
      </NavWrapper>
      {dropMenu && <DropMenu />}
    </>
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

const HamburgerBar = styled.button`
  margin-right: 15px;
  padding-top: 5px;
  border: none;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.div`
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
