import styled from 'styled-components';
import MypageAside from './MypageAside';
import ProfileApplyStatus from './ProfileApplyStatus';

const Mypage = () => {
  return (
    <MypageWrapper>
      <MypageContainer>
        <MypageHeader>MY 원티드</MypageHeader>
        <ProfileContainer>
          <MypageAside />
          <ProfileApplyContainer>
            <ProfileApplyStatus />
          </ProfileApplyContainer>
        </ProfileContainer>
      </MypageContainer>
    </MypageWrapper>
  );
};
const MypageWrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  background-color: #f8f8f8;
`;
const MypageContainer = styled.div`
  margin: 0 auto;
  max-width: 1060px;
`;
const MypageHeader = styled.div`
  padding: 50px 0 20px;
  margin: 25px 0 05px;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.fontBlack};
`;
const ProfileContainer = styled.div`
  display: flex;
`;
const ProfileApplyContainer = styled.div`
  width: 650px;
  margin-left: 20px;
`;
export default Mypage;
