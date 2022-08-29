import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const MypageAside = () => {
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    fetch('http://52.15.84.15:8000/applications/results', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => setUserProfile(data.user_info));
  }, []);
  return (
    <ProfileAside>
      <AsideTop>
        <AsideTopProfile src={userProfile.image} />
        <AsideTopName>{userProfile.name}</AsideTopName>
        <AsideTopEmail>{userProfile.email}</AsideTopEmail>
        <AsideTopPhoneNumber>010-5423-8051</AsideTopPhoneNumber>
        <AsideTopButton>
          <AsideTopButtonText>관심태그 설정하기</AsideTopButtonText>
          <AsideTopButtonEmoticon>👉</AsideTopButtonEmoticon>
        </AsideTopButton>
      </AsideTop>
      <AsideSecond>
        <AsideSecondPoint>
          <AsideText>포인트</AsideText>
          <AsideSecondPointNumber>1,000P</AsideSecondPointNumber>
        </AsideSecondPoint>
      </AsideSecond>
    </ProfileAside>
  );
};
const ProfileAside = styled.div`
  width: 250px;
  border: 1px solid #dbdbdb;
  background-color: white;
`;
const AsideTop = styled.div`
  padding: 42px 20px 30px;
  border-bottom: 1px solid #dbdbdb;
  text-align: center;
  font-size: 14px;
`;
const AsideTopProfile = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  object-fit: cover;
`;
const AsideTopName = styled.p`
  padding-top: 30px;
  font-size: 18px;
  font-weight: bold;
  line-height: 19px;
`;
const AsideTopEmail = styled.p`
  padding-top: 20px;
`;
const AsideTopPhoneNumber = styled.p`
  padding-top: 5px;
`;
const AsideTopButton = styled.button`
  margin-top: 20px;
  height: 38px;
  border: none;
  border-radius: 19px;
  background-color: #f2f4f7;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
const AsideTopButtonText = styled.span`
  padding: 0 16px 0 16px;
  font-size: 13px;
`;
const AsideTopButtonEmoticon = styled.span`
  padding-left: 15px;
  font-size: 18px;
`;
const AsideSecond = styled.div`
  padding: 30px 20px;
  border-bottom: 1px solid #dbdbdb;
  color: gray;
`;
const AsideSecondPoint = styled.p`
  display: flex;
  justify-content: space-between;
`;
const AsideSecondPointNumber = styled.span`
  color: black;
  font-size: 22px;
`;
const AsideText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export default MypageAside;
