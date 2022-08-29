import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';

const SubFilter = ({ selectHandler }) => {
  const [isClickBtn, setIsClickBtn] = useState({
    location: false,
    career: false,
    skill: false,
    sort: false,
  });
  const [checkLocation, setCheckLocation] = useState({
    all: true,
    seoul: false,
    gyeonggi: false,
    busan: false,
  });
  const [checkYears, setCheckYears] = useState({
    total: true,
    newcommer: false,
    experienced: false,
  });
  const [checkSkills, setCheckSkills] = useState({
    python: false,
    django: false,
    javascript: false,
    react: false,
  });
  const [checkSort, setCheckSort] = useState({
    most_recent: false,
    popularity: false,
  });

  const { all, seoul, gyeonggi, busan } = checkLocation;
  const { total, newcommer, experienced } = checkYears;
  const { most_recent, popularity } = checkSort;

  const buttonHandler = (category, value) => {
    if (category === 'location') {
      if (value === 'all' && !all) {
        setCheckLocation({
          all: true,
          seoul: false,
          gyeonggi: false,
          busan: false,
        });
      }

      if (value !== 'all') {
        if (!seoul || !gyeonggi || !busan) {
          setCheckLocation(prevState => {
            return {
              all: false,
              seoul: false,
              gyeonggi: false,
              busan: false,
              [value]: !prevState[value],
            };
          });
        }
      }
    }

    if (category === 'career') {
      if (value === 'total' && !total) {
        setCheckYears({
          total: true,
          newcommer: false,
          experienced: false,
        });
      }

      if (value !== 'total') {
        if (!newcommer || !experienced) {
          setCheckYears(prevState => {
            return {
              total: false,
              newcommer: false,
              experienced: false,
              [value]: !prevState[value],
            };
          });
        }
      }
    }

    if (category === 'skill') {
      setCheckSkills(prevState => {
        return {
          python: false,
          django: false,
          javascript: false,
          react: false,
          [value]: !prevState[value],
        };
      });
    }

    if (category === 'sort') {
      setCheckSort({
        ...{
          most_recent: false,
          popularity: false,
        },
        [value]: true,
      });
    }
  };

  const convertObjToList = object => {
    const result = [];

    for (let key in object) {
      if (object[key]) {
        if (key === 'all' || key === 'total') {
          return [];
        } else {
          result.push(key);
        }
      }
    }

    return result;
  };

  const submitHandler = useCallback(
    key => {
      if (key === 'location') {
        selectHandler(key, convertObjToList(checkLocation));
      } else if (key === 'career') {
        selectHandler(key, convertObjToList(checkYears));
      } else if (key === 'skill') {
        selectHandler(key, convertObjToList(checkSkills));
      } else if (key === 'sort') {
        selectHandler(key, convertObjToList(checkSort));
      }
    },
    [checkLocation, checkYears, checkSkills, checkSort, selectHandler]
  );

  const clickHandler = value => {
    setIsClickBtn(prevState => {
      return { ...prevState, [value]: !prevState[value] };
    });
  };

  useEffect(() => {
    if (!seoul && !gyeonggi && !busan) {
      setCheckLocation({
        all: true,
        seoul: false,
        gyeonggi: false,
        busan: false,
      });
    }

    if (!newcommer && !experienced) {
      setCheckYears({
        total: true,
        newcommer: false,
        experienced: false,
      });
    }
  }, [seoul, gyeonggi, busan, newcommer, experienced]);

  useEffect(() => {
    submitHandler('sort');
  }, [submitHandler, most_recent, popularity]);

  return (
    <SubFilterContainer>
      <SubCategoryContainer>
        {SUB_CATEGORY.map(item => {
          return (
            <SubCategory key={item.id}>
              <SubFilterBtn
                onClick={() => {
                  clickHandler(item.titleEng);
                }}
              >
                <SubFilterBtnTitle>{item.title}</SubFilterBtnTitle>
                <SubFilterIconWrapper isClickBtn={isClickBtn[item.titleEng]}>
                  <FaCaretDown />
                </SubFilterIconWrapper>
              </SubFilterBtn>
              <SubCategoryBtnContainer isClickBtn={isClickBtn[item.titleEng]}>
                <SubCategoryBtn>
                  <CategoryBtnText>{item.description}</CategoryBtnText>
                  <CategoryBtnWrapper>
                    {item.categoryList.map(ele => {
                      return (
                        <ButtonSelect
                          key={ele.id}
                          isChecked={
                            ele.titleEng === 'location'
                              ? checkLocation[ele.category]
                              : ele.titleEng === 'career'
                              ? checkYears[ele.category]
                              : checkSkills[ele.category]
                          }
                          onClick={() => {
                            buttonHandler(ele.titleEng, ele.category);
                          }}
                        >
                          {ele.text}
                        </ButtonSelect>
                      );
                    })}
                  </CategoryBtnWrapper>
                </SubCategoryBtn>
                <SubmitBtnWrapper>
                  <ButtonSubmit
                    onClick={() => {
                      submitHandler(item.titleEng);
                      clickHandler(item.titleEng);
                    }}
                  >
                    적용하기
                  </ButtonSubmit>
                </SubmitBtnWrapper>
              </SubCategoryBtnContainer>
              <BackDrop
                isClickBtn={isClickBtn[item.titleEng]}
                onClick={() => {
                  clickHandler(item.titleEng);
                }}
              />
            </SubCategory>
          );
        })}
      </SubCategoryContainer>
      <ExtraFilterContainer>
        <ButtonExtra
          onClick={() => {
            clickHandler('sort');
          }}
          isClickBtn={isClickBtn.sort}
        >
          <SubFilterBtnTitle>
            {most_recent ? '최신순' : '인기순'}
          </SubFilterBtnTitle>
          <SubFilterIconWrapper isClickBtn={isClickBtn.sort}>
            <FaCaretDown />
          </SubFilterIconWrapper>
        </ButtonExtra>
        <ExtraFilterBox
          isClickBtn={isClickBtn.sort}
          onClick={() => {
            buttonHandler('sort', most_recent ? 'popularity' : 'most_recent');
            clickHandler('sort');
          }}
        >
          {most_recent ? '인기순' : '최신순'}
        </ExtraFilterBox>
        <BackDrop
          isClickBtn={isClickBtn.sort}
          onClick={() => {
            clickHandler('sort');
          }}
        />
      </ExtraFilterContainer>
    </SubFilterContainer>
  );
};

const SubFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
  padding: 20px 10px;
`;

const SubCategoryContainer = styled.div`
  display: flex;
`;

const SubCategory = styled.div`
  position: relative;
  display: flex;
`;

const SubFilterBtn = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-right: 20px;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: rgb(241, 244, 247);
  }
`;

const SubFilterBtnTitle = styled.span`
  margin: 0 15px;
`;

const SubFilterIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.35s;
  transform: ${({ isClickBtn }) => (isClickBtn ? 'rotate(180deg)' : 'none')};
`;

const SubCategoryBtnContainer = styled.div`
  position: absolute;
  display: ${({ isClickBtn }) => (isClickBtn ? 'flex' : 'none')};
  flex-direction: column;
  top: 50px;
  left: 0px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
  z-index: 20;
`;

const SubCategoryBtn = styled.div`
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
  width: 100px;
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

const ExtraFilterContainer = styled.div`
  position: relative;
`;

const ButtonExtra = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ isClickBtn }) => (isClickBtn ? '5px 5px 0 0' : '5px')};
  background-color: white;
  font-size: 14px;
  cursor: pointer;
`;

const ExtraFilterBox = styled.div`
  position: absolute;
  display: ${({ isClickBtn }) => (isClickBtn ? 'flex' : 'none')};
  align-items: center;
  width: 110px;
  height: 40px;
  padding: 0 25px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0 0 5px 5px;
  background-color: white;
  font-size: 14px;
  z-index: 20;
  cursor: pointer;
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

export default SubFilter;

const SUB_CATEGORY = [
  {
    id: 1,
    title: '지역',
    titleEng: 'location',
    description: '지역을 선택해 주세요.',
    categoryList: [
      {
        id: 11,
        titleEng: 'location',
        category: 'all',
        text: '전국',
      },
      {
        id: 12,
        titleEng: 'location',
        category: 'seoul',
        text: '서울',
      },
      {
        id: 13,
        titleEng: 'location',
        category: 'gyeonggi',
        text: '경기',
      },
      {
        id: 14,
        titleEng: 'location',
        category: 'busan',
        text: '부산',
      },
    ],
  },
  {
    id: 2,
    title: '경력',
    titleEng: 'career',
    description: '경력을 선택해 주세요.',
    categoryList: [
      {
        id: 21,
        titleEng: 'career',
        category: 'total',
        text: '경력무관',
      },
      {
        id: 22,
        titleEng: 'career',
        category: 'newcommer',
        text: '신입',
      },
      {
        id: 23,
        titleEng: 'career',
        category: 'experienced',
        text: '경력직',
      },
    ],
  },
  {
    id: 3,
    title: '기술스택',
    titleEng: 'skill',
    description: '많이 쓰는 인기 기술 스택을 추천해 드려요!',
    categoryList: [
      {
        id: 31,
        titleEng: 'skill',
        category: 'python',
        text: 'Python',
      },
      {
        id: 32,
        titleEng: 'skill',
        category: 'django',
        text: 'Django',
      },
      {
        id: 33,
        titleEng: 'skill',
        category: 'javascript',
        text: 'JavaScript',
      },
      {
        id: 34,
        titleEng: 'skill',
        category: 'react',
        text: 'React',
      },
    ],
  },
];
