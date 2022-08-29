import React, { useEffect, useState } from 'react';

import HeaderCarousel from './HeaderCarousel';
import MidNavBar from './MidNavBar';
import ApplyNowCarousel from './ApplyNowCarousel';
import styled from 'styled-components';
import SuggestCarousel from './SuggestCarousel';

const Main = () => {
  const [companyData, setCompanyData] = useState([]);
  useEffect(() => {
    fetch('http://52.15.84.15:8000/jobs/random')
      .then(res => res.json())
      .then(data => {
        setCompanyData(data.results);
      });
  }, []);

  const [headerCompanyImg, setHeaderCompanyImg] = useState([]);
  useEffect(() => {
    fetch('/data/MainImg.json')
      .then(res => res.json())
      .then(data => {
        setHeaderCompanyImg(data);
      });
  }, []);

  return (
    companyData[0] && (
      <>
        <HeaderMargin />
        <HeaderCarousel headerCompanyImg={headerCompanyImg} />
        <MidNavBar />
        <SideMargin>
          <Text>지금 바로 지원해볼까요?</Text>
          <ApplyNowCarousel companyData={companyData} />
        </SideMargin>
        <SideMargin>
          <Text>wanted ai가 제안하는 합격률 높은 포지션</Text>
          <SuggestCarousel companyData={companyData} />
        </SideMargin>
      </>
    )
  );
};

const HeaderMargin = styled.div`
  margin-top: 10rem;
`;

const SideMargin = styled.div`
  margin: 0 20rem;
`;

const Text = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Fascinate&family=Lobster&display=swap');
  display: flex;
  justify-content: center;
  margin: 8rem 0 2rem;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Black Han Sans', sans-serif;
`;
export default Main;
