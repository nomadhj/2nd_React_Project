import React, { useState } from 'react';
import styled from 'styled-components';
import DetailMap from './DetailMap';

const JobDetail = () => {
  const [detailList, setDetailList] = useState({});

  return (
    <div>
      <Wrapper>
        <LeftWrapper>
          <CompanyImg />
          <LeftTitle>{detailList.job_detail?.job_name}</LeftTitle>
          <CompanyDescription>
            <CompanyTitle>{detailList.job_detail?.company_name}</CompanyTitle>
            <CompanyResponse>응답률 매우 높음</CompanyResponse>
            <span>|</span>
            <p>{detailList.job_detail?.company_location}</p>
          </CompanyDescription>
          <HashTagArea>
            <span>#스타트업</span>
            <span>#재택근무</span>
            <span>#IT,컨텐츠</span>
          </HashTagArea>
          <UnderBar />
          <DetailMap detailList={detailList} />
          <FollowBox>
            <FollowCompany>
              <img src={detailList.job_detail?.company_logo} alt="" />
              <FollowCompanyTitle>
                <CompanyField>
                  {detailList.job_detail?.company_name}
                </CompanyField>
                <div className="CompanyField">IT,컨텐츠</div>
              </FollowCompanyTitle>
            </FollowCompany>
            <FollowBtn>좋아요</FollowBtn>
          </FollowBox>
        </LeftWrapper>
      </Wrapper>
    </div>
  );
};

export default JobDetail;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 70rem;
  margin: auto;
  padding-top: 4%;
  margin-bottom: 10%;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const CompanyImg = styled.img.attrs(() => {
  return {
    src: 'https://i.pinimg.com/564x/27/e0/74/27e074008b1d54fb474224de9102651b.jpg',
  };
})`
  width: 100%;
  height: 450px;
`;

const LeftTitle = styled.div`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 700;
`;

const CompanyDescription = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  span {
    margin-right: 10px;
    color: lightgrey;
  }
`;

const CompanyTitle = styled.div`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const CompanyResponse = styled.div`
  border: 1px solid green;
  margin-right: 10px;
  padding: 4px;
  font-size: 12px;
  color: green;
`;

const HashTagArea = styled.div`
  display: flex;

  span {
    padding: 8px 10px;
    margin: 10px 10px 10px 0;
    border-radius: 10px;
    background: #f2f5f8;
  }
`;

const UnderBar = styled.div`
  margin-top: 60px;
  border: 1px solid #eee;
`;

const FollowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  margin-top: 40px;
  border: 1px solid #e1e2e3;
`;

const FollowCompany = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;

  img {
    width: 70px;
  }
`;

const FollowCompanyTitle = styled.div`
  margin-left: 10px;
`;

const CompanyField = styled.div`
  color: #999;
`;

const FollowBtn = styled.button`
  padding: 10px 20px;
  border: 1px solid #e1e2e3;
  border-radius: 50px;
  background: white;
  color: #36f;
  cursor: pointer;
`;
