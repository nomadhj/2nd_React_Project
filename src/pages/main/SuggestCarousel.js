import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import styled from 'styled-components';

const SuggestCarousel = ({ companyData }) => {
  const ApplyNowCompanyData = [...companyData].reverse();

  return (
    <SlideContainer>
      <Swiper
        slidesPerView={3}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {ApplyNowCompanyData.map(object => {
          return (
            <SwiperSlide key={object.id}>
              <Img src={object.image} alt="기업사진" />
              <ApplyNowDescription>
                <ApplyNowDescriptionName>{object.name}</ApplyNowDescriptionName>
                <ApplyNowDescriptionCompany>
                  {object.company}
                </ApplyNowDescriptionCompany>
                <ApplyNowDescriptionLocation>
                  {object.location}
                </ApplyNowDescriptionLocation>
              </ApplyNowDescription>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  padding-bottom: 4rem;
  border-bottom: 1px solid #ddd;
`;

const Img = styled.img`
  position: relative;
  height: 15rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  object-fit: cover;
`;

const ApplyNowDescription = styled.div``;

const ApplyNowDescriptionName = styled.div`
  margin: 0.8rem 0;
  font-size: 1.125rem;
  font-weight: bold;
`;

const ApplyNowDescriptionCompany = styled.div`
  margin-bottom: 0.3rem;
  font-size: 0.875rem;
  font-weight: bold;
`;

const ApplyNowDescriptionLocation = styled.div`
  font-size: 0.875rem;
  color: #999999;
`;

export default SuggestCarousel;
