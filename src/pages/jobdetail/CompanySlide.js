import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const CompanySlide = ({ detailList }) => {
  return (
    <Slider {...settings}>
      <SlideImg>
        <img src={detailList.job_detail?.company_images[0]} alt="companyImg1" />
      </SlideImg>

      <SlideImg>
        <img src={detailList.job_detail?.company_images[1]} alt="companyImg2" />
      </SlideImg>

      <SlideImg>
        <img
          src={detailList.job_detail?.company_images?.[2]}
          alt="companyImg3"
        />
      </SlideImg>
    </Slider>
  );
};

export default CompanySlide;

const SlideImg = styled.div`
  width: 100%;
  height: 450px;

  img {
    width: 100%;
    height: 100%;
  }
`;
