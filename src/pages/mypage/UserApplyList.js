import React from 'react';
import styled from 'styled-components';

const UserApplyList = ({ applyList }) => {
  return (
    <>
      {applyList.map(applyListData => {
        const { id, company_logo, company_name, position, time, result } =
          applyListData;

        const COMPANY_DATA = [
          { id: 1, content: company_name, widthy: 25 },
          { id: 2, content: position, widthy: 40 },
          { id: 3, content: time, widthy: 25 },
          { id: 4, content: result, widthy: 22 },
          { id: 5, content: '추천인 없음', widthy: 30 },
          { id: 6, content: '신청', widthy: 10 },
        ];

        return (
          <CompanyContainer key={id}>
            <CompanyLogo src={company_logo} alt="회사로고" />
            {COMPANY_DATA.map(companyData => {
              return (
                <CompanyName key={companyData.id} widthy={companyData.widthy}>
                  {companyData.content}
                </CompanyName>
              );
            })}
          </CompanyContainer>
        );
      })}
    </>
  );
};

const CompanyContainer = styled.div`
  display: flex;
  padding: 10px 0 10px 20px;
  border-bottom: 1px solid #dbdbdb;
  font-weight: bold;
  font-size: 14px;
  color: #a8b0b7;
  line-height: 2;
`;

const CompanyLogo = styled.img`
  width: 30px;
  height: 30px;
`;

const CompanyName = styled.div`
  width: ${props => props.widthy}%;
`;

export default UserApplyList;
