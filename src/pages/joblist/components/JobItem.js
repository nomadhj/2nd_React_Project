import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
// import useFetch from '../../../hooks/useFetch';

const JobItem = ({ item, onChangeList, isLogin }) => {
  const { id, company, jobName, url, location, years, like } = item;

  const naviagate = useNavigate();
  // const { httpRequest } = useFetch();

  // const url_likeData = `http://52.15.84.15:8000/jobs/${id}/follow`;

  const goToDetail = () => {
    naviagate(`/jobdetail/${id}`);
  };

  const toggleLikeButton = event => {
    event.stopPropagation();
    onChangeList(id);
    // httpRequest({
    //   url: url_likeData,
    //   method: 'POST',
    // });
  };

  return (
    <ItemContainer onClick={goToDetail}>
      <ImgContainer>
        {isLogin && (
          <IconSolidHeart like={like}>
            <FaHeart />
          </IconSolidHeart>
        )}
        {isLogin && (
          <IconRegularHeart onClick={toggleLikeButton}>
            <FaRegHeart />
          </IconRegularHeart>
        )}
        <LogoImage src={url} />
      </ImgContainer>
      <JobDescription>
        <JobCategory>{jobName}</JobCategory>
        <JobName>{company}</JobName>
        <JobLocation>{location}</JobLocation>
        <JobYears>{`${years} 채용`}</JobYears>
      </JobDescription>
    </ItemContainer>
  );
};

const ItemContainer = styled.li.attrs(() => {
  return { className: 'jobItem' };
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  padding: 10px;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
`;

const IconSolidHeart = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  font-size: 22px;
  color: ${({ like }) =>
    like ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  z-index: 1;
`;

const IconRegularHeart = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  font-size: 22px;
  color: white;
  z-index: 2;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 185px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  object-fit: cover;
`;

const JobDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 14px 0;
`;

const JobCategory = styled.p`
  color: ${({ theme }) => theme.fontBlack};
  font-size: 18px;
  font-weight: bold;
`;

const JobName = styled.p`
  height: 22px;
  margin-top: 10px;
  color: ${({ theme }) => theme.fontBlack};
  font-size: 14px;
  font-weight: bold;
`;

const JobLocation = styled.p`
  height: 22px;
  margin-top: 10px;
  color: ${({ theme }) => theme.fontGray};
  font-size: 14px;
`;

const JobYears = styled.p`
  height: 22px;
  padding: 3px;
  margin-top: 10px;
  border: 2px solid #23b1b1;
  border-radius: 2px;
  color: #23b1b1;
  font-size: 14px;
`;

export default JobItem;

const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTd9.ZLfjk6sHhjvX3_D5KJb-l5QlKECQXOpI874ozA2WHT4';
