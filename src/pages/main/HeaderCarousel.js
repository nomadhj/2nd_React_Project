import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';
import styled from 'styled-components';

const HeaderCarousel = ({ headerCompanyImg }) => {
  return (
    <Swiper
      slidesPerView={1.5}
      slidesPerGroup={1}
      loop={true}
      loopFillGroupWithBlank={true}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {headerCompanyImg.map((object, i) => {
        return (
          <SwiperSlide key={i}>
            <Img src={object.company_image} alt="기업사진" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const Img = styled.img`
  height: 20rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  object-fit: cover;
`;

export default HeaderCarousel;
