import { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import JobItem from './JobItem';
import SkeletonUi from './SkeletonUI';
import useFetch from '../../../hooks/useFetch';
import API from '../../../config';

let page = 1;
const LIMIT_PAGINATION = 12;
const LIMIT_ITEM_AMOUNT = 50;
const LIMIT_SKELETON_AMOUNT = 8;

const JobItemList = () => {
  const [itemList, setItemList] = useState([]);
  const { httpRequest, isLoading, error } = useFetch();

  const isLogin = !!localStorage.getItem('token');
  const fakeList = Array.from({ length: LIMIT_SKELETON_AMOUNT }, (_, i) => i);

  const scrollMemoHandler = useCallback(() => {
    const savedScroll = +sessionStorage.getItem('scroll');
    const savedPage = +sessionStorage.getItem('page');
    if (savedScroll && savedPage) {
      setTimeout(() => {
        window.scrollTo(0, savedScroll);
      }, 0);
      page = +sessionStorage.getItem('page');
      sessionStorage.clear();
    }
  }, []);

  const itemListHandler = useCallback(
    data => {
      const loadedItemList = [
        ...data.map(item => {
          return {
            id: item.id,
            jobName: item.author.split(' ')[0],
            company: item.author.split(' ')[1],
            location: '서울 강남구',
            years: '신입',
            like: false,
            url: item.download_url,
          };
        }),
      ];
      setItemList(prevState => {
        return [...prevState, ...loadedItemList];
      });
      page++;
      scrollMemoHandler();
    },
    [scrollMemoHandler]
  );

  const bookmarkHandler = id => {
    setItemList(prevState => {
      return prevState.map(item => {
        if (item.id === id) {
          return { ...item, like: !item.like };
        } else {
          return item;
        }
      });
    });
  };

  const intersectionObserver = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            httpRequest(
              {
                url: API.itemList + `page=${page}&limit=${LIMIT_PAGINATION}`,
              },
              itemListHandler
            );
          }
        });
      },
      { threshold: 0.8 }
    );
  }, [httpRequest, itemListHandler]);

  useEffect(() => {
    let limit = LIMIT_PAGINATION;
    let offset = page;
    const savedScroll = +sessionStorage.getItem('scroll');
    const savedPage = +sessionStorage.getItem('page');
    if (savedScroll && savedPage) {
      offset = 1;
      limit = LIMIT_PAGINATION * (savedPage - 1);
    }
    httpRequest(
      { url: API.itemList + `page=${offset}&limit=${limit}` },
      itemListHandler
    );
  }, [httpRequest, itemListHandler]);

  useEffect(() => {
    const jobItemList = document.querySelectorAll('.jobItem');
    if (jobItemList.length > LIMIT_ITEM_AMOUNT)
      intersectionObserver.disconnect();
    else if (jobItemList.length !== 0) {
      const lastJobItem = jobItemList[jobItemList.length - 1];
      intersectionObserver.observe(lastJobItem);
    }
  }, [intersectionObserver, itemList.length]);

  const renderItemList = itemList.map(item => {
    return (
      <JobItem
        key={item.id}
        item={item}
        onChangeList={bookmarkHandler}
        isLogin={isLogin}
        page={page}
      />
    );
  });

  const renderFakeList = fakeList.map(item => <SkeletonUi key={item} />);

  return (
    <ItemListContainer>
      {error && (
        <>
          <ErrorMessage>데이터 송/수신에 문제가 발생했습니다.</ErrorMessage>
          <ErrorMessage>{error.message}</ErrorMessage>
        </>
      )}
      <ItemList>
        {renderItemList}
        {isLoading && renderFakeList}
      </ItemList>
    </ItemListContainer>
  );
};

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 225px;
`;

const ErrorMessage = styled.p`
  margin: 50px 0 0 0;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: 24px;
  font-weight: bold;
`;

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 55vw;
`;

export default JobItemList;
