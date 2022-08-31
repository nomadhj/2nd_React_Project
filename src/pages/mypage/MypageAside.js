import { useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/AuthContext';

const MypageAside = () => {
  const context = useContext(AuthContext);
  const { user } = context;

  return (
    <ProfileAside>
      <AsideTop>
        <AsideTopProfile src={user.photoURL} />
        <AsideTopName>{user.displayName}</AsideTopName>
        <AsideTopEmail>{user.email}</AsideTopEmail>
        <AsideTopPhoneNumber>
          {user.phoneNumber ? user.phoneNumber : 'no Phone number'}
        </AsideTopPhoneNumber>
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
