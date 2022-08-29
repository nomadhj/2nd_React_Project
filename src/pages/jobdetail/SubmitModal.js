import React from 'react';
import styled from 'styled-components';
import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';

const SubmitModal = ({ setSubmitModal }) => {
  const modalClose = () => {
    setSubmitModal(false);
  };
  return (
    <Modal>
      <AlertPage>
        <CloseIcon>
          <GrFormClose onClick={modalClose} />
        </CloseIcon>
        <AlertTitle>지원이 완료되었습니다.</AlertTitle>
        <AlertDescription>
          대상자분들은 지원하신 이력서를 바탕으로 매치업 프로필을
          <br />
          자동 생성해 드릴 예정입니다. 프로필이 생성되면,
          <br />
          기업으로부터 매치업을 통한 "면접 제안"을 받으실 수 있습니다.
        </AlertDescription>
        <AlertBtn onClick={modalClose}> 확인 </AlertBtn>
      </AlertPage>
    </Modal>
  );
};

export default SubmitModal;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(76, 76, 76, 0.5);
  z-index: 99999;
`;

const AlertPage = styled.div`
  position: relative;
  text-align: center;
  width: 500px;
  padding: 20px;
  border-radius: 5px;
  background: white;
`;

const CloseIcon = styled.div`
  font-size: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const AlertTitle = styled.div`
  margin-top: 40px;
  font-size: 23px;
  font-weight: 700;
`;

const AlertDescription = styled.div`
  margin-top: 40px;
  line-height: 30px;
  font-size: 15px;
  color: gray;
`;

const AlertBtn = styled.button`
  margin-top: 40px;
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 18px;
  background-color: #3366ff;
  cursor: pointer;
`;
