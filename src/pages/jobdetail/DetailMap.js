import React from 'react';
import styled from 'styled-components';
// import NaverMaps from './NaverMaps';

const DetailMap = ({ detailList }) => {
  return (
    <MapArea>
      <MapDescription>
        <Title>마감일</Title>
        <span>{detailList.job_detail?.job_deadline}</span>
      </MapDescription>
      <MapDescription>
        <Title>근무지역</Title>
        <span>{detailList.job_detail?.company_address}</span>
      </MapDescription>
      {/* <NaverMaps detailList={detailList} /> */}
    </MapArea>
  );
};

export default DetailMap;

const MapArea = styled.div`
  margin-top: 40px;
`;

const MapDescription = styled.div`
  display: flex;
  margin-top: 10px;

  span {
    margin-right: 20px;
    font-weight: 600;
  }
`;

const Title = styled.span`
  width: 70px;
  color: #999;
  font-weight: 700;
`;
