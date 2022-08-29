import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const LikePage = () => {
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    fetch('http://52.15.84.15:8000/jobs/followedjob', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setLikeList(data.results);
      });
  }, []);

  return (
    <LikeContainer>
      <ContainerCenter>
        <PageTitle>좋아요</PageTitle>
        <LikeCompany>
          {likeList.map((item, i) => {
            return (
              <LikeCompanyBox key={i}>
                <LikeCompanyImg alt="Company img" src={item.image} />
                <CompanyDescription>{item.position}</CompanyDescription>
                <CompanyTitle>{item.company_name}</CompanyTitle>
                <CompanyLocal>{item.location}</CompanyLocal>
              </LikeCompanyBox>
            );
          })}
        </LikeCompany>
      </ContainerCenter>
    </LikeContainer>
  );
};

export default LikePage;

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f8f8fa;
`;

const ContainerCenter = styled.div`
  width: 75rem;
  padding: 100px 40px;
`;

const PageTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const LikeCompany = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LikeCompanyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: 20px 30px 0 0;
`;

const LikeCompanyImg = styled.img`
  width: 250px;
  height: 180px;
`;

const CompanyDescription = styled.div`
  margin-top: 10px;
  line-height: 20px;
  font-size: 17px;
  font-weight: 600;
`;

const CompanyTitle = styled.div`
  margin-top: 10px;
  font-weight: 600;
`;

const CompanyLocal = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #999999;
`;
