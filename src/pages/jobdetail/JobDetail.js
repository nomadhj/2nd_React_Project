import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RiErrorWarningLine } from '@react-icons/all-files/ri/RiErrorWarningLine';
import styled from 'styled-components';
import JobDetailDescription from './JobDetailDescription';
import DetailMap from './DetailMap';
import Apply from './Apply';
import ApplyInformation from './ApplyInformation';
import SubmitModal from './SubmitModal';
import CompanySlide from './CompanySlide';

const JobDetail = () => {
  const [apply, setApply] = useState(true);
  const [detailList, setDetailList] = useState({});
  const [userFile, setUserFile] = useState([]);
  const [submitModal, setSubmitModal] = useState(false);
  const { job_id } = useParams();

  useEffect(() => {
    fetch(`http://52.15.84.15:8000/jobs/${job_id}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setDetailList(res);
      });
  }, []);

  const likeBtn = e => {
    fetch(`http://52.15.84.15:8000/jobs/${job_id}/follow`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: detailList,
    }).then(res => res.json());

    fetch(`http://52.15.84.15:8000/jobs/${job_id}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setDetailList(res);
      });
  };

  return (
    <div>
      {submitModal ? <SubmitModal setSubmitModal={setSubmitModal} /> : null}
      <Wrapper>
        <LeftWrapper>
          <CompanySlide detailList={detailList} />
          <LeftTitle>{detailList.job_detail?.job_name}</LeftTitle>
          <CompanyDescription>
            <CompanyTitle>{detailList.job_detail?.company_name}</CompanyTitle>
            <CompanyResponse>응답룰 매우 높음</CompanyResponse>
            <span>|</span>
            <p>{detailList.job_detail?.company_location}</p>
          </CompanyDescription>
          <HashTagArea>
            <span>#스타트업</span>
            <span>#재택근무</span>
            <span>#IT,컨텐츠</span>
          </HashTagArea>
          <JobDetailDescription detailList={detailList} />
          <SkillStackArea>
            <span>Git</span>
            <span>Github</span>
            <span>Javascript</span>
            <span>Python</span>
          </SkillStackArea>
          <UnderBar />
          <DetailMap detailList={detailList} />
          <FollowBox>
            <FollowCompany>
              <img src={detailList.job_detail?.company_logo} alt="" />
              <FollowCompanyTitle>
                <CompanyField>
                  {detailList.job_detail?.company_name}
                </CompanyField>
                <div className="CompanyField">IT,컨텐츠</div>
              </FollowCompanyTitle>
            </FollowCompany>
            <FollowBtn onClick={e => likeBtn(e)}>좋아요</FollowBtn>
          </FollowBox>
          <WarnBox>
            <RiErrorWarningLine className="warnIcon" />
            <WarnSentence>
              본 채용정보는 원티드랩의 동의없이 무단전재, 재배포, 재가공할 수
              없으며, 구직활동 이외의 용도로 사용할 수 없습니다.
            </WarnSentence>
          </WarnBox>
        </LeftWrapper>
        <RightWrapper>
          {apply ? (
            <Apply
              setApply={setApply}
              detailList={detailList}
              setDetailList={setDetailList}
              likeBtn={likeBtn}
            />
          ) : (
            <ApplyInformation
              setApply={setApply}
              userFile={userFile}
              setUserFile={setUserFile}
              setSubmitModal={setSubmitModal}
              detailList={detailList}
              likeBtn={likeBtn}
            />
          )}
        </RightWrapper>
      </Wrapper>
    </div>
  );
};

export default JobDetail;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 70rem;
  margin: auto;
  padding-top: 4%;
  margin-bottom: 10%;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const LeftTitle = styled.div`
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

const SkillStackArea = styled.div`
  display: flex;
  margin-top: 10px;

  span {
    padding: 8px 10px;
    margin: 10px 5px 0 0;
    border-radius: 15px;
    background: #e4f4ec;
  }
`;

const UnderBar = styled.div`
  margin-top: 60px;
  border: 1px solid #eee;
`;

const FollowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  margin-top: 40px;
  border: 1px solid #e1e2e3;
`;

const FollowCompany = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;

  img {
    width: 70px;
  }
`;

const FollowCompanyTitle = styled.div`
  margin-left: 10px;
`;

const CompanyField = styled.div`
  color: #999;
`;

const FollowBtn = styled.button`
  padding: 10px 20px;
  border: 1px solid #e1e2e3;
  border-radius: 50px;
  background: white;
  color: #36f;
  cursor: pointer;
`;

const WarnBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  margin-top: 10px;
  font-size: 30px;
  background: #f3f5f8;
`;

const WarnSentence = styled.div`
  margin: 4px;
  font-size: 12px;
`;

const RightWrapper = styled.div`
  position: fixed;
  width: 25rem;
  right: 10%;
`;
