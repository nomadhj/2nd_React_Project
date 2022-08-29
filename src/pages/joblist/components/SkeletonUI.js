import styled from 'styled-components';

const SkeletonUi = () => {
  return (
    <SkeletonContainer>
      <SkeletonImgContainer>
        <LoadingImg src="/images/joblist/loading.gif" />
      </SkeletonImgContainer>
      <SkeltonDescription>
        <SkeltonText />
        <SkeltonText />
        <SkeltonText />
        <SkeltonText />
      </SkeltonDescription>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  padding: 10px;
`;

const SkeletonImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 185px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  animation-name: skeletonLoading;
  animation-duration: 2s;

  @keyframes skeletonLoading {
    0% {
      background-color: ${({ theme }) => theme.borderColor};
    }

    33% {
      background-color: #bbb;
    }

    66% {
      background-color: ${({ theme }) => theme.borderColor};
    }

    100% {
      background-color: #bbb;
    }
  }
`;

const LoadingImg = styled.img`
  width: 30%;
`;

const SkeltonDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 14px 0;
`;

const SkeltonText = styled.p`
  height: 14px;
  width: 70%;
  margin-top: 18px;
  border-radius: 5px;
  animation-name: skeletonLoading;
  animation-duration: 3s;

  @keyframes skeletonLoading {
    0% {
      background-color: ${({ theme }) => theme.borderColor};
    }

    33% {
      background-color: #bbb;
    }

    66% {
      background-color: ${({ theme }) => theme.borderColor};
    }

    100% {
      background-color: #bbb;
    }
  }

  &:first-child {
    height: 18px;
    width: 100%;
    margin-top: 0px;
    margin-bottom: 4px;
  }
`;

export default SkeletonUi;
