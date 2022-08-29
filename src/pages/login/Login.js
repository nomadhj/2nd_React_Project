import styled, { css } from 'styled-components';

import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { FaComment } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const KakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  const NaverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${process.env.REACT_APP_CALLBACKURL}&state=${process.env.REACT_APP_STATE}`;
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.REACT_APP_GOOGLE_SCOPE}`;

  const handleKakaoLogin = () => {
    window.location.href = KakaoAuthURL;
  };

  const handleNaverLogin = () => {
    window.location.href = NaverAuthURL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  const goToMain = () => {
    navigate('/');
  };
  return (
    <LoginContainer>
      <Container>
        <Head>
          <Title>Wanted</Title>
          <XIcon onClick={goToMain}>
            <AiOutlineClose />
          </XIcon>
        </Head>

        <Intro>
          <IntroBold>
            직장인을 위한
            <br /> 커리어 플랫폼, 원티드!
          </IntroBold>
          <IntroNormal>
            커리어 성장과 행복을 위한 여정
            <br />
            지금 원티드에서 시작하세요.
          </IntroNormal>
        </Intro>
        <Email>
          <EmailText>이메일</EmailText>
          <EmailInput />
        </Email>
        <Select>
          <SelectEmailButton>
            <EmailIcon />
            이메일로 계속하기
          </SelectEmailButton>
          <SelectOtherText>
            or <br /> 다음 계정으로 계속하기
          </SelectOtherText>
        </Select>
        <Options>
          <Kakao onClick={handleKakaoLogin}>
            <KakaoIcon>
              <FaComment />
            </KakaoIcon>
            <KakaoText>Kakao</KakaoText>
          </Kakao>
          <Naver onClick={handleNaverLogin}>
            <NaverIcon>
              <ReactNaverIcon />
            </NaverIcon>
            <NaverText>Naver</NaverText>
          </Naver>
          <Google onClick={handleGoogleLogin}>
            <GoogleIcon>
              <FcGoogle />
            </GoogleIcon>
            <GoogleText>Google</GoogleText>
          </Google>
        </Options>
      </Container>
    </LoginContainer>
  );
};

const IconAndText = css`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const LoginContainer = styled.div`
  margin: 10rem auto;
  height: 100vh;
  width: 25rem;
  display: flex;
  align-items: center;
  overflow-y: auto;
  z-index: 5;
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

const Title = styled.div`
  font-weight: bold;
`;

const XIcon = styled.div`
  position: absolute;
  right: 1rem;
  cursor: pointer;
`;

const Intro = styled.div`
  margin: 4rem 0 2.5rem;
  text-align: center;
  line-height: 1.5;
`;

const IntroBold = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const IntroNormal = styled.div``;

const Email = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const EmailText = styled.span`
  margin-bottom: 1rem;
`;

const EmailInput = styled.input`
  padding: 1rem;
  border-radius: 0.4rem;
  border-color: #999999;
  background-color: rgba(135, 206, 235, 0.2);
  font-size: 1.3rem;
`;

const Select = styled.div`
  margin: 1rem;
  width: 90%;
  text-align: center;
  line-height: 2rem;
`;

const SelectEmailButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 2.5rem;
  border: none;
  background-color: #238bfe;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1f59fb;
  }
`;

const EmailIcon = styled(HiOutlineMail)`
  color: white;
`;

const SelectOtherText = styled.div``;

const Options = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 5rem;
  margin: 4rem;
`;

const Kakao = styled.div`
  cursor: pointer;
`;

const Naver = styled(Kakao)``;

const Google = styled(Kakao)``;

const KakaoIcon = styled.div`
  background-color: yellow;
  ${IconAndText}
`;

const KakaoText = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;

const NaverIcon = styled.div`
  ${IconAndText}
`;

const ReactNaverIcon = styled(SiNaver)`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: white;
  color: #3bda80;
  font-size: 1.5rem;
`;

const NaverText = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;

const GoogleIcon = styled.div`
  border: 0.1rem solid gray;
  ${IconAndText}
`;

const GoogleText = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;

export default Login;
