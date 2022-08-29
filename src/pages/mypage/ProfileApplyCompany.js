import React from 'react';
import styled from 'styled-components';
import UserApplyList from './UserApplyList';

const ProfileApplyCompany = ({ applyList }) => {
  return (
    <ProfileApplyCompanyList>
      <ApplyCompanyContainer>
        {LIST_INFO.map(({ id, content, paddingRight, paddingBottom }) => {
          return (
            <ApplyCompany
              key={id}
              paddingRight={paddingRight}
              paddingBottom={paddingBottom}
            >
              {content}
            </ApplyCompany>
          );
        })}
      </ApplyCompanyContainer>

      <UserApplyList applyList={applyList} />
    </ProfileApplyCompanyList>
  );
};

const ApplyCompanyContainer = styled.div`
  display: flex;
  padding-top: 10px;
  padding-left: 30px;
  border-bottom: 1px solid #dbdbdb;
  font-size: 15px;
  font-weight: bold;
`;

const ApplyCompany = styled.div`
  padding-bottom: ${props => props.paddingBottom}px;
  padding-right: ${props => props.paddingRight}px;
`;

const ProfileApplyCompanyList = styled.div`
  margin-top: 20px;
`;

export default ProfileApplyCompany;

const LIST_INFO = [
  {
    id: 1,
    content: '지원 회사',
    paddingRight: 120,
    paddingBottom: 20,
  },
  { id: 2, content: '지원 포지션', paddingRight: 60 },
  { id: 3, content: '작성시간', paddingRight: 50 },
  { id: 4, content: '진행상태', paddingRight: 50 },
  { id: 5, content: '추천 현황', paddingRight: 50 },
  { id: 6, content: '보상금 신청' },
];
