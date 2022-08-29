import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MainFilter from './MainFilter';
import SubFilter from './SubFilter';

const Navbar = ({ onChangeFilter }) => {
  const [selectState, setSelectState] = useState({
    sub_category: [],
    location: [],
    career: [],
    skill: [],
    sort: [],
  });

  const navigate = useNavigate();

  const locationObj = useLocation();
  const queryParams = locationObj.search;

  const selectHandler = useCallback((key, value) => {
    setSelectState(prevState => {
      return { ...prevState, [key]: value };
    });
  }, []);

  const queryCategory = {
    sub_category: {
      string: '',
      length: 3,
      object: {
        fullStack: 1,
        frontEnd: 2,
        backEnd: 3,
      },
    },
    location: {
      string: '',
      length: 3,
      object: {
        seoul: 1,
        gyeonggi: 2,
        busan: 3,
      },
    },
    career: {
      string: '',
      length: 2,
      object: {
        total: 1,
        newcommer: 2,
        experienced: 3,
      },
    },
    skill: {
      string: '',
      length: 4,
      object: {
        python: 1,
        django: 2,
        javascript: 3,
        react: 4,
      },
    },
  };

  for (let key in queryCategory) {
    queryCategory[key].string =
      selectState[key].length === 0 ||
      selectState[key].length === queryCategory[key].length
        ? ``
        : selectState[key]
            .map(selectedItem => {
              return `${key}=` + queryCategory[key].object[selectedItem];
            })
            .join('&');
  }

  const queryForSort =
    selectState.sort.length === 0
      ? ''
      : selectState.sort
          .map(selectedItem => {
            return 'sort=' + selectedItem;
          })
          .join('&');

  const { sub_category, location, career, skill } = queryCategory;

  const queryString = [
    sub_category.string,
    location.string,
    career.string,
    skill.string,
    queryForSort,
  ]
    .filter(string => string.length !== 0)
    .join('&');

  const naviagateURL = `/joblist?${queryString}`;

  const myNavigate = useCallback(() => {
    navigate(naviagateURL);
  }, [navigate, naviagateURL]);

  useEffect(() => {
    myNavigate();
  }, [myNavigate]);

  useEffect(() => {
    onChangeFilter(queryParams);
  }, [onChangeFilter, queryParams]);

  return (
    <Filterbar>
      <MainFilter selectHandler={selectHandler} />
      <SubFilter selectHandler={selectHandler} />
    </Filterbar>
  );
};

const Filterbar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 225px;
  padding-top: 50px;
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  background-color: white;
  z-index: 10;
`;

export default Navbar;
