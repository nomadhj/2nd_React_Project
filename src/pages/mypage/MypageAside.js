import styled from 'styled-components';

// 전역 상태관리를 통해 유저정보 전달 기능 추가 할 것
const MypageAside = () => {
  return (
    <ProfileAside>
      <AsideTop>
        <AsideTopProfile src="" />
        <AsideTopName>김현주</AsideTopName>
        <AsideTopEmail>aaaa@aaaa</AsideTopEmail>
        <AsideTopPhoneNumber>010-1234-5678</AsideTopPhoneNumber>
      </AsideTop>
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

export default MypageAside;
