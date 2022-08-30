import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';

const MainFilter = ({ selectHandler }) => {
  const [isClickBtn, setIsClickBtn] = useState(false);
  const [checkMainFilter, setCheckMainFilter] = useState({
    all: true,
    fullStack: false,
    frontEnd: false,
    backEnd: false,
  });

  const { all, fullStack, frontEnd, backEnd } = checkMainFilter;

  const buttonHandler = value => {
    if (value === 'all' && !all) {
      setCheckMainFilter({
        all: true,
        1: false,
        2: false,
        3: false,
      });
    }

    if (value !== 'all') {
      if (!fullStack || !frontEnd || !backEnd) {
        setCheckMainFilter(prevState => {
          return {
            all: false,
            fullStack: false,
            frontEnd: false,
            backEnd: false,
            [value]: !prevState[value],
          };
        });
      }
    }
  };

  const convertObjToList = object => {
    const result = [];

    for (let key in object) {
      if (object[key]) {
        if (key === 'all') {
          return [];
        } else {
          result.push(key);
        }
      }
    }

    return result;
  };

  const submitHandler = () => {
    selectHandler('sub_category', convertObjToList(checkMainFilter));
    clickHandler();
  };

  const clickHandler = () => {
    setIsClickBtn(prevState => !prevState);
  };

  useEffect(() => {
    if (!fullStack && !frontEnd && !backEnd) {
      setCheckMainFilter({
        all: true,
        fullStack: false,
        frontEnd: false,
        backEnd: false,
      });
    }
  }, [fullStack, frontEnd, backEnd]);

  const mainFilterContent =
    convertObjToList(checkMainFilter).length === 0
      ? '개발 전체'
      : convertObjToList(checkMainFilter)
          .map(filterText => {
            return MAIN_CATEGORY.filter(item => {
              return item.category === filterText;
            })[0].text;
          })
          .join(', ');

  return (
    <MainFilterContainer isClickBtn={isClickBtn}>
      <MainFilterTitle>개발</MainFilterTitle>
      <JobCategoryFilter>
        <MainFilterBtn onClick={clickHandler}>
          <MainFilterContent>{mainFilterContent}</MainFilterContent>
          <IconWrapper isClickBtn={isClickBtn}>
            <FaAngleDown />
          </IconWrapper>
        </MainFilterBtn>
        <CategoryBtnContainer isClickBtn={isClickBtn}>
          <CategoryBtn>
            <CategoryBtnText>직무를 선택해 주세요.</CategoryBtnText>
            <CategoryBtnWrapper>
              {MAIN_CATEGORY.map(item => {
                return (
                  <ButtonSelect
                    key={item.id}
                    isChecked={checkMainFilter[item.category]}
                    onClick={() => {
                      buttonHandler(item.category);
                    }}
                  >
                    {item.text}
                  </ButtonSelect>
                );
              })}
            </CategoryBtnWrapper>
          </CategoryBtn>
          <SubmitBtnWrapper>
            <ButtonSubmit onClick={submitHandler}>적용하기</ButtonSubmit>
          </SubmitBtnWrapper>
        </CategoryBtnContainer>
        <BackDrop isClickBtn={isClickBtn} onClick={clickHandler} />
      </JobCategoryFilter>
    </MainFilterContainer>
  );
};

const MainFilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 55%;
  margin-top: 40px;
  padding: 10px;
`;

const MainFilterTitle = styled.p`
  border-right: 2px solid ${({ theme }) => theme.borderColor};
  padding-right: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const JobCategoryFilter = styled.div`
  position: relative;
`;

const MainFilterBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 24px;
  cursor: pointer;
`;

const MainFilterContent = styled.span`
  margin-right: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid
    ${({ isClickBtn, theme }) =>
      isClickBtn ? theme.fontBlack : theme.borderColor};
  border-radius: 50%;
  font-size: 14px;
  transition: 0.35s;
  transform: ${({ isClickBtn }) => (isClickBtn ? 'rotate(180deg)' : 'none')};

  &:hover {
    border: 1px solid ${({ theme }) => theme.fontBlack};
  }
`;

const CategoryBtnContainer = styled.div`
  position: absolute;
  display: ${({ isClickBtn }) => (isClickBtn ? 'flex' : 'none')};
  flex-direction: column;
  top: 40px;
  left: -55px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
  z-index: 20;
`;

const CategoryBtn = styled.div`
  padding: 25px 25px 8px;
`;

const CategoryBtnText = styled.p`
  margin: 0 0 10px 5px;
  color: ${({ theme }) => theme.fontGray};
  font-size: 14px;
`;

const CategoryBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ButtonSelect = styled.button`
  height: 32px;
  padding: 8px 14px;

  border: 1px solid
    ${({ isChecked, theme }) => (isChecked ? theme.primaryBlue : 'white')};
  border-radius: 16px;
  background-color: ${props =>
    props.isChecked ? 'white' : 'rgb(241, 244, 247)'};
  color: ${({ isChecked, theme }) =>
    isChecked ? theme.primaryBlue : theme.fontBlack};
  cursor: pointer;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.secondaryBlue};
  }
`;

const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 500px;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ButtonSubmit = styled.button`
  height: 40px;
  padding: 0px 27px;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.secondaryBlue};
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primaryBlue};
  }
`;

const BackDrop = styled.div`
  display: ${({ isClickBtn }) => (isClickBtn ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100vh;
  background: transparent;
  z-index: 15;
`;

const MAIN_CATEGORY = [
  {
    id: 1,
    category: 'all',
    text: '개발 전체',
  },
  {
    id: 2,
    category: 'fullStack',
    text: '풀스택 개발자',
  },
  {
    id: 3,
    category: 'frontEnd',
    text: '프론트엔드 개발자',
  },
  {
    id: 4,
    category: 'backEnd',
    text: '백엔드 개발자',
  },
];

export default MainFilter;
