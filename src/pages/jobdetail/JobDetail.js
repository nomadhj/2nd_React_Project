import styled from 'styled-components';
import DetailMap from './DetailMap';

const JobDetail = () => {
  return (
    <div>
      <Wrapper>
        <CompanyInfo>
          <CompanyImg />
          <Title>FrontEnd 개발</Title>
          <CompanyDescription>
            <CompanyTitle>회사 이름</CompanyTitle>
            <CompanyResponse>응답률 매우 높음</CompanyResponse>
            <span>|</span>
            <p>서울특별시</p>
          </CompanyDescription>
          <HashTagArea>
            <span>#스타트업</span>
            <span>#재택근무</span>
            <span>#IT, 컨텐츠</span>
          </HashTagArea>
        </CompanyInfo>
        <LocationInfo>
          <DetailMap />
        </LocationInfo>
      </Wrapper>
    </div>
  );
};

export default JobDetail;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 70rem;
  margin: auto;
  padding-top: 4%;
  margin-bottom: 2rem;
`;

const CompanyInfo = styled.div`
  width: 50%;
  margin-top: 2rem;
`;

const LocationInfo = styled.div`
  width: 50%;
  margin-top: 2rem;
`;

const CompanyImg = styled.img.attrs(() => {
  return {
    src: 'https://i.pinimg.com/564x/27/e0/74/27e074008b1d54fb474224de9102651b.jpg',
  };
})`
  width: 30rem;
  height: 25rem;
`;

const Title = styled.div`
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
