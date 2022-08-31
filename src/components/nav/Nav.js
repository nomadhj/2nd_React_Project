import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.js';
import SearchModal from './components/SearchModal.js';
import { IoIosSearch } from 'react-icons/io';

const Nav = () => {
  const [isShownSearchBar, setIsShownSearchBar] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { logOut, isLoggedIn } = context;

  const moveToPage = event => {
    event.preventDefault();
    const { innerText: name } = event.target;
    if (name === 'wantUS') navigate('/');
    if (name === '마이 페이지') navigate('/mypage');
    if (name === '로그인') navigate('login');
  };

  const searchBarHandler = () => {
    setIsShownSearchBar(prevState => !prevState);
  };

  return (
    <NavWrapper>
      <NavContainer>
        <Mainbar>
          <Title onClick={moveToPage}>wantUS</Title>
        </Mainbar>
        <MenuListContainer />
        <NavRightContainer>
          <UserSection>
            <SearchIcon onClick={searchBarHandler} />
            {isLoggedIn ? (
              <Login onClick={logOut}>로그아웃</Login>
            ) : (
              <Login onClick={moveToPage}>로그인</Login>
            )}
          </UserSection>
          <CompanyService onClick={moveToPage}>
            {isLoggedIn ? '마이 페이지' : '기업 서비스'}
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
