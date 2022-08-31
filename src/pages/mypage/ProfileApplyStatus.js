import React from 'react';
import styled from 'styled-components';

const ProfileApplyStatus = () => {
  const APPLY_STATUS = [
    { id: 1, content: '지원 완료', statusNumber: 0 },
    { id: 2, content: '서류 통과', statusNumber: 0 },
    { id: 3, content: '최종 합격', statusNumber: 0 },
    { id: 4, content: '불합격', statusNumber: 0 },
  ];

  return (
    <ProfileApplySummary>
      <ApplyTitle>지원 현황</ApplyTitle>
      <ApplyRating>
        {APPLY_STATUS.map(applyStatusData => {
          const { id, statusNumber, content } = applyStatusData;
          return (
            <ApplyStatus key={id}>
              <ApplyRatingNumber>{statusNumber}</ApplyRatingNumber>
              <ApplyRatingText>{content}</ApplyRatingText>
            </ApplyStatus>
          );
        })}
      </ApplyRating>
    </ProfileApplySummary>
  );
};

const ProfileApplySummary = styled.div`
  padding: 26px 0 34px;
  border: 1px solid #dbdbdb;
  background-color: white;
`;

const ApplyTitle = styled.div`
  padding: 0 32px 26px;
  font-size: 18px;
  font-weight: bold;
`;

const ApplyRating = styled.div`
  display: flex;
  text-align: center;
`;

const ApplyStatus = styled.div`
  flex: 2.5;
  border-right: 2px solid #dbdbdb;

  &:last-child {
    border-right: none;
  }
`;

const ApplyRatingNumber = styled.div`
  padding-bottom: 11px;
  font-size: 36px;
`;

const ApplyRatingText = styled.div`
  line-height: 19px;
`;

export default ProfileApplyStatus;
