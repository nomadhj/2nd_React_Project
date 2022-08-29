import styled from 'styled-components';
import { BsHeartFill } from '@react-icons/all-files/bs/BsHeartFill';

const Apply = ({ setApply, likeBtn, detailList }) => {
  const goToApplyInformation = () => {
    setApply(false);
  };

  return (
    <ApplyArea>
      <ApplyTitle>지원하기</ApplyTitle>
      <ApplyDescription>프론트/백엔드 모바일웹 분야 개발자</ApplyDescription>
      <ApplyBtn bg="white" color="#3366ff" onClick={likeBtn}>
        좋아요
      </ApplyBtn>
      <ApplyBtn bg="#3366ff" color="white" onClick={goToApplyInformation}>
        지원하기
      </ApplyBtn>
      <LikeBox onClick={likeBtn}>
        <HeartIcon likeFollow={detailList.job_detail?.follow} />
        <span>{detailList.job_detail?.follow_count}</span>
      </LikeBox>
    </ApplyArea>
  );
};

export default Apply;

const ApplyArea = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #e1e2e3;
  border-radius: 4px;
`;

const ApplyTitle = styled.div`
  margin-bottom: 30px;
  font-weight: 600;
`;

const ApplyDescription = styled.div`
  margin-bottom: 30px;
  color: #999999;
`;

const ApplyBtn = styled.button`
  padding: 15px 40px;
  width: 350px;
  border: 1px solid #3366ff;
  border-radius: 50px;
  margin-bottom: 10px;
  background: ${props => props.bg};
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.color};
  cursor: pointer;
`;
const LikeBox = styled.p`
  display: flex;
  justify-content: center;
  width: 60px;
  margin-top: 20px;
  padding: 5px 10px;
  border: 1px solid #e1e2e3;
  border-radius: 50px;
  font-size: 16px;
  color: gray;
  cursor: pointer;

  span {
    margin-left: 5px;
  }
`;

const HeartIcon = styled(BsHeartFill)`
  color: ${({ likeFollow }) => (likeFollow ? 'red' : '#999999')};
`;
