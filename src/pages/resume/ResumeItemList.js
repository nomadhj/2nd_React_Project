import React, { useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import FileSaver from 'file-saver';

const ResumeItemList = ({ resumeData, setUserFile }) => {
  const [modal, setModal] = useState(false);
  const modalEl = useRef();
  const [deleteReviewUpdate, setDeleteReviewUpdate] = useState(false);

  const showModal = e => {
    setModal(!modal);
  };

  const handleCloseModal = useCallback(
    e => {
      if (modal && !modalEl.current.contains(e.target)) {
        setModal(false);
      }
    },
    [modal]
  );

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  }, [handleCloseModal, modal]);

  let downloadFile = new Blob([resumeData], {
    type: 'text/plain;charset=utf-8',
  });

  const fileDownload = e => {
    FileSaver.saveAs(downloadFile, resumeData.name);
  };

  const fileDelete = e => {
    e.preventDefault();
    fetch(`http://52.15.84.15:8000/resumes/list/${resumeData.id}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          setDeleteReviewUpdate(!deleteReviewUpdate);
          alert('삭제가 완료되었습니다.');
        }
      });
    fetch('http://52.15.84.15:8000/resumes/list', {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(data => {
        setUserFile(data.result);
      });
  };

  return (
    <ResumeItem>
      <ResumeItemText>
        <ResumeItemTitle>{resumeData.user}</ResumeItemTitle>
        <ResumeItemTime>2022.06.16</ResumeItemTime>
        <FileName>{resumeData.name}</FileName>
      </ResumeItemText>
      <ResumeItemInfo onClick={showModal} ref={modalEl}>
        <ResumeItemInfoLang>한</ResumeItemInfoLang>
        <ResumeItemInfoWriting>작성 완료</ResumeItemInfoWriting>
        <FontDot />
      </ResumeItemInfo>
      {modal && (
        <ResumeItemInfoModal>
          <ModalForm>
            <ModalFormButton>이름변경</ModalFormButton>
            <ModalFormButton onClick={fileDownload}>다운로드</ModalFormButton>
            <ModalFormButton onClick={fileDelete}>삭제</ModalFormButton>
          </ModalForm>
        </ResumeItemInfoModal>
      )}
    </ResumeItem>
  );
};

const ResumeItemCard = css`
  height: 190px;
  width: calc(25% - 20px);
  margin: 0 20px 20px 0;
  border: 1px solid #dbdbdb;
  background-color: white;
`;

const ResumeItem = styled.div`
  position: relative;
  ${ResumeItemCard}
`;

const ResumeItemText = styled.div`
  padding: 20px;
  text-align: left;
  color: ${props => props.theme.fontGray};
`;

const ResumeItemTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ResumeItemTime = styled.p`
  padding-top: 10px;
`;

const FileName = styled.p`
  padding-top: 50px;
  font-size: 14px;
`;

const ResumeItemInfo = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  padding: 8px 12px 8px 20px;
  border-top: 1px solid #e0e0e0;
  font-weight: bold;
  color: #999;
  line-height: 1.3;
  cursor: pointer;
`;

const ResumeItemInfoLang = styled.div`
  margin-right: 12px;
  border: 1px solid #999;
  border-radius: 2px;
  color: #999;
  font-size: 12px;
  line-height: 1.5;
`;

const ResumeItemInfoWriting = styled.span``;

const FontDot = styled(BsThreeDotsVertical)`
  margin-left: 100px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: bold;
`;

const ResumeItemInfoModal = styled.div`
  position: absolute;
  z-index: 101;
`;

const ModalForm = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 29px;
  right: -80px;
  min-width: 160px;
  padding: 5px 0;
  border: 1px solid #d2d2d2;
`;

const ModalFormButton = styled.div`
  padding: 5px 20px;
  border: none;
  background-color: white;
  text-align: left;
  font-size: 14px;
  color: ${props => props.theme.fontGray};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export default ResumeItemList;
