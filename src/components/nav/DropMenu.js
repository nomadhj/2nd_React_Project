import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const DropMenu = () => {
  const [currentId, setCurrentID] = useState();

  const moveCategory = (e, value) => {};
  const moveSubCategory = id => {};

  return (
    <DropMenuContainer>
      <FirstDrop>
        {DROP_LIST.map(({ id, content, list }) => {
          return (
            <DropList
              key={id}
              onMouseEnter={() => setCurrentID(id)}
              onMouseLeave={() => setCurrentID()}
              onClick={moveCategory}
            >
              {content}
              {currentId === id && (
                <DevelopeMenu>
                  {list.map(({ id, listname }) => {
                    return (
                      <DropList key={id} onClick={moveSubCategory}>
                        {listname}
                      </DropList>
                    );
                  })}
                </DevelopeMenu>
              )}
            </DropList>
          );
        })}
      </FirstDrop>
    </DropMenuContainer>
  );
};

export default DropMenu;

const DropMenuStyle = css`
  position: absolute;
  width: 10%;
  background-color: white;
`;

const DropMenuContainer = styled.div``;

const FirstDrop = styled.div`
  left: 22%;
  top: 5.5%;
  ${DropMenuStyle}
  z-index: 1000;
  border: 1px solid #ddd;
  border-top: none;
`;

const DropList = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;

  font-size: 14px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const DevelopeMenu = styled.div`
  ${DropMenuStyle}
  left: 100%;
  top: 0%;
  width: 100%;
  color: black;
`;

const DROP_LIST = [
  { id: 1, content: '직군 전체', list: [] },
  {
    id: 2,
    content: '개발',
    list: [
      { id: 1, listname: '개발 전체' },
      { id: 2, listname: '풀스택 개발자' },
      { id: 3, listname: '프론트엔드 개발자' },
      { id: 4, listname: '백엔드 개발자' },
    ],
  },
  {
    id: 3,
    content: '디자인',
    list: [
      { id: 1, listname: '그래픽 디자이너' },
      { id: 2, listname: '모바일 디자이너' },
      { id: 3, listname: '웹 디자이너' },
      { id: 4, listname: '광고 디자이너' },
    ],
  },
  {
    id: 4,
    content: '경영/비지니스',
    list: [
      { id: 1, listname: '서비스 기획자' },
      { id: 2, listname: 'PM' },
      { id: 3, listname: '전략 기획자' },
      { id: 4, listname: '운영 매니저' },
      { id: 5, listname: '데이터 분석가' },
      { id: 6, listname: '컨설턴트' },
      { id: 7, listname: '사무보조' },
      { id: 8, listname: '오피스 관리' },
    ],
  },
  { id: 5, content: '영업', list: [] },
  { id: 6, content: '게임 제작', list: [] },
  { id: 7, content: '데이터 엔지니어', list: [] },
];
