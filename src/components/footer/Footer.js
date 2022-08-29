import React from 'react';
import styled from 'styled-components';
import { AiOutlineInstagram } from '@react-icons/all-files/ai/AiOutlineInstagram';
import { AiFillYoutube } from '@react-icons/all-files/ai/AiFillYoutube';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { RiGooglePlayFill } from '@react-icons/all-files/ri/RiGooglePlayFill';

const Footer = () => {
  return (
    <Wrapper>
      <FooterBox>
        <FooterContainer>
          <FooterTop>
            <FooterTopLeft>
              <img
                src="https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202108/12/kukinews/20210812102806613yney.jpg"
                alt="logo"
              />
              <TopMenu>
                <MenuList>기업소개</MenuList>
                <MenuList>이용약관</MenuList>
                <MenuList>개인정보 처리방침</MenuList>
                <MenuList>고객센터</MenuList>
              </TopMenu>
            </FooterTopLeft>
            <IconBox>
              <Icons>
                <AiOutlineInstagram />
              </Icons>
              <Icons>
                <AiFillYoutube />
              </Icons>
              <Icons>
                <FaFacebook />
              </Icons>
              <Icons>
                <RiGooglePlayFill />
              </Icons>
            </IconBox>
          </FooterTop>
          <FooterBottom>
            <BottomDescription>
              (주)원트어스 | 서울특별시 강남구 | 통신판매번호 :
              2022-서울강남-0000 <br />
              유료직업소개사업등록번호 : 제2022-0000000-00-0-00000호 |
              사업자등록번호 : 123-4567-8910 | 02-123-4567 <br /> © WantUS, Inc.
            </BottomDescription>
          </FooterBottom>
        </FooterContainer>
      </FooterBox>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  height: 100%;
  min-height: 100%;
`;

const FooterBox = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  transform: translateY(-0%);
  width: 100vw;
  height: 200px;
  padding: 18px 0 65px;
  background-color: #fff;
  border-top: 1px solid #ececec;
`;

const FooterContainer = styled.div`
  width: 60%;
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ececec;

  img {
    width: 100px;
  }
`;

const FooterTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TopMenu = styled.div`
  display: flex;
`;

const MenuList = styled.div`
  margin: 0 20px;
  color: #3a3a3a;
  font-weight: 600;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  font-size: 30px;
`;

const Icons = styled.div`
  margin: 0 10px;
  color: gray;
  cursor: pointer;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
`;

const BottomDescription = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #3a3a3a;
`;
