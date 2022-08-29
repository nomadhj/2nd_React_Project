import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MypageAside from './MypageAside';
import ProfileApplyStatus from './ProfileApplyStatus';
import ProfileApplyCompany from './ProfileApplyCompany';
const Mypage = () => {
  const [applyList, setApplyList] = useState([]);
  useEffect(() => {
    fetch('http://52.15.84.15:8000/applications/results', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => setApplyList(data.application_results));
  }, []);
  return (
    <MypageWrapper>
      <MypageContainer>
        <MypageHeader>MY 원티드</MypageHeader>
        <ProfileContainer>
          <MypageAside />
          <ProfileApplyContainer>
            <ProfileApplyStatus applyList={applyList} />
            <ProfileApplyCompany applyList={applyList} />
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
  margin-left: 20px;
`;
export default Mypage;
