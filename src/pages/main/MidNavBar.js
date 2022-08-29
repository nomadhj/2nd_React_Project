import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

const MidNavBar = () => {
  const navigate = useNavigate();
  const goToJoblist = () => {
    navigate('/joblist');
  };
  const goToMyProfile = () => {
    navigate('/mypage');
  };
  return (
    <Bar>
      <EmployAnnouncement onClick={goToJoblist}>
        <SearchIcon />
        <div>채용공고</div>
      </EmployAnnouncement>
      <MyProfile onClick={goToMyProfile}>
        <ProfileIcon />
        <div>내 프로필</div>
      </MyProfile>
    </Bar>
  );
};
const Bar = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  margin: 10rem auto;
`;
const EmployAnnouncement = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 2rem 0;
  background-color: #f3f5ff;
  border-radius: 3rem;
  font-size: 1.5rem;
  cursor: pointer;
`;
const SearchIcon = styled(FaSearch)`
  margin-right: 1rem;
`;
const MyProfile = styled(EmployAnnouncement)`
  background-color: #f3f9fe;
  margin-left: 1.5rem;
`;

const ProfileIcon = styled(CgProfile)`
  margin-right: 1rem;
`;

export default MidNavBar;
