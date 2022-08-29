import { useEffect, useState, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // context 또는 redux 활용하여 리팩토링 할 것;
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const goToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleResponse = useCallback(
    response => {
      const token = response.credential;
      const userObject = jwt_decode(token);
      localStorage.setItem('token', token);
      setUser(userObject);
      alert(`${userObject.name}님 환영합니다`);
      goToMain();
    },
    [goToMain]
  );

  useEffect(() => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInBtn'), {
      theme: 'filled_blue',
      size: 'large',
      text: 'signin_with',
    });
  }, [handleResponse]);

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
            <SignInBtn />
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

const SignInBtn = styled.div.attrs(() => {
  return { id: 'signInBtn' };
})``;

export default Login;
