import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ApplyInformation = ({
  setApply,
  userFile,
  setUserFile,
  setSubmitModal,
  detailList,
}) => {
  const [submitBtn, setSubmitBtn] = useState(true);

  useEffect(() => {
    fetch('http://52.15.84.15:8000/resumes/list', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        let copy = [...userFile];
        res.result.map(item => {
          copy.unshift({ isChecked: true, file: item });
          return setUserFile(copy);
        });
      });
  }, []);

  const goToBack = () => {
    setApply(true);
  };

  const uploadHandler = e => {
    let copy = [...userFile];
    copy.unshift({ isChecked: true, file: e.target.files[0] });
    setUserFile(copy);

    const formData = new FormData();
    formData.append('resume', e.target.files[0]);

    fetch('http://52.15.84.15:8000/resumes/upload', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: formData,
    }).then(res => res.json());

    userFile.splice(0, userFile.length);

    e.preventdefault();

    fetch('http://52.15.84.15:8000/resumes/list', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        let copy = [...userFile];
        res.result.map(item => {
          copy.unshift({ isChecked: true, file: item });
          return setUserFile(copy);
        });
      });
  };

  const handleFileChecked = name => {
    const newFileCheck = userFile.map(item => {
      if (item.file.name === name) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setUserFile(newFileCheck);
    let result = userFile.some(item => item.isChecked === false);
    setSubmitBtn(!result);
  };

  const handleSubmitBtn = () => {
    setSubmitModal(true);
  };

  return (
    <InformationArea>
      <InfoTitle>
        <div />
        <div>지원하기</div>
        <ApplyBack onClick={goToBack}>뒤로</ApplyBack>
      </InfoTitle>
      <InfoInputBox>
        <ApplyInfoTitle>지원 정보</ApplyInfoTitle>
        <ApplyInfoInput>
          <FileBox>이름</FileBox>
          <ApplyInput defaultValue={detailList.user_info?.name} />
        </ApplyInfoInput>
        <ApplyInfoInput>
          <FileBox>이메일</FileBox>
          <ApplyInput defaultValue={detailList.user_info?.email} />
        </ApplyInfoInput>
        <ApplyInfoInput>
          <FileBox>휴대폰 번호</FileBox>
          <ApplyInput />
        </ApplyInfoInput>
        <ApplyInfoInput>
          <FileBox>추천인</FileBox>
          <ApplyInput placeholder="선택사항" />
        </ApplyInfoInput>
        <ApplyInfoTitle>첨부파일</ApplyInfoTitle>
        {userFile &&
          userFile.map((files, i) => {
            return (
              <AttachFile
                key={i}
                onChange={() => handleFileChecked(files.file.name)}
                isCheck={files.isChecked}
              >
                <input type="checkbox" />
                <div>
                  <FileName>{files.file.name}</FileName>
                  <FileDate>2022.06.16 첨부파일</FileDate>
                </div>
              </AttachFile>
            );
          })}

        <Upload>
          <UploadInput
            display="none"
            type="file"
            id="avatar"
            name="avatar"
            accept=".pdf"
            onChange={e => uploadHandler(e)}
          />
          <label htmlFor="avatar">첨부파일</label>
        </Upload>

        <UploadFile bg="white" fontColor="#666666">
          새 이력서 작성
        </UploadFile>
        <Postscript>
          원티드 이력서로 지원하면 최종 합격률이 40% 높아집니다.
        </Postscript>
      </InfoInputBox>
      <SubmitResume>
        <UploadFile
          bg="#3366ff"
          fontColor="white"
          disabled={submitBtn}
          onClick={handleSubmitBtn}
        >
          제출하기
        </UploadFile>
      </SubmitResume>
    </InformationArea>
  );
};

export default ApplyInformation;

const InformationArea = styled.div`
  width: 100%;
  border: 1px solid #e1e2e3;
  border-radius: 4px;
  position: relative;
`;

const InfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e1e2e3;
  font-weight: 600;
`;

const ApplyBack = styled.div`
  color: #999999;
  cursor: pointer;
`;

const InfoInputBox = styled.div`
  width: 100%;
  height: 600px;
  border: 1px solid #e1e2e3;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ApplyInfoTitle = styled.div`
  margin-top: 30px;
  padding: 8px 20px;
  border-left: 2px solid #258bf7;
  font-weight: 600;
`;

const ApplyInfoInput = styled.div`
  display: flex;
  margin: 20px 20px 0 20px;
  border-bottom: 1px solid #e1e2e3;
  font-weight: 600;
`;

const ApplyInput = styled.input`
  border: none;
  padding-left: 20px;
  margin-bottom: 15px;
  font-size: 17px;
  font-weight: 600;
`;

const FileBox = styled.div`
  width: 90px;
  margin-top: 5px;
  color: #333333;
`;

const AttachFile = styled.div`
  display: flex;
  width: 350px;
  margin: 20px 20px;
  padding: 20px;
  border: 1px solid #ececec;
  border-radius: 6px;
  border-color: ${({ isCheck }) => (isCheck ? '#ececec' : '#3366FF')};

  input {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;
const FileName = styled.div`
  font-weight: 600;
`;

const FileDate = styled.div`
  margin-top: 3px;
  font-size: 13px;
`;

const Postscript = styled.div`
  margin: 20px;
  margin-bottom: 40px;
  font-size: 14px;
  color: #666666;
`;

const Upload = styled.form`
  display: flex;
  justify-content: center;
  width: 350px;
  margin: 10px 20px 0 20px;
  padding: 15px 0;
  border: 1px solid #ececec;
  border-radius: 50px;
  color: #666666;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: ${props => props.display};
`;

const UploadFile = styled.button`
  width: 350px;
  margin: 10px 20px 0 20px;
  padding: 15px 0;
  border: 1px solid #ececec;
  border-radius: 50px;
  background-color: ${props => props.bg};
  color: ${props => props.fontColor};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: #f2f4f7;
    color: #666666;
    cursor: default;
  }
`;

const SubmitResume = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #e1e2e3;
`;
