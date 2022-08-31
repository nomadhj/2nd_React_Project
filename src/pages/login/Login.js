import { useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleButton } from 'react-google-button';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { logIn, isLoggedIn } = context;

  const goToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      goToMain();
    }
  }, [goToMain, isLoggedIn]);

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTitle>
          <Title>WantUS</Title>
          <CloseButton onClick={goToMain}>X</CloseButton>
        </LoginTitle>
        <LoginSection>
          <LoginDescription>WantUS에 오신 것을 환영합니다.</LoginDescription>
          <LoginDescription>google 계정으로 시작</LoginDescription>
          <LoginButtonWrapper>
            <GoogleButton onClick={logIn} />
          </LoginButtonWrapper>
        </LoginSection>
      </LoginWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginWrapper = styled.div`
  border: 1px solid #dddddd;
  border-radius: 10px;
`;

const LoginTitle = styled.header`
  position: relative;
  margin: 10px;
`;

const Title = styled.div`
  width: 300px;
  padding: 10px;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  padding: 10px;
  background-color: transparent;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 300px;
`;

const LoginDescription = styled.div`
  flex: 2;
  padding-top: 50px;
  text-align: center;
  color: ${({ theme }) => theme.fontBlack};

  &:nth-child(2) {
    padding-top: 0;
    color: ${({ theme }) => theme.fontGray};
    font-size: 12px;
  }
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 6;
  padding-bottom: 50px;
`;

export default Login;
