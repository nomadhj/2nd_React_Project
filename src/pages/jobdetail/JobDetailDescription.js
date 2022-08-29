import React from 'react';
import styled from 'styled-components';

const JobDetailDescription = ({ detailList }) => {
  const codes = detailList.job_detail?.job_content;

  return (
    <DescriptionWrapper>
      <div dangerouslySetInnerHTML={{ __html: codes }} />
      <DescriptionTitle>기술스택 ・ 툴</DescriptionTitle>
    </DescriptionWrapper>
  );
};

export default JobDetailDescription;

const DescriptionWrapper = styled.div`
  margin-top: 10px;
  line-height: 1.5em;
  color: gray;
`;

const DescriptionTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
