import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import JobItem from './JobItem';
import SkeletonUi from './SkeletonUI';
import useFetch from '../../../hooks/useFetch';

const JobItemList = ({ queryString }) => {
  const [itemList, setItemList] = useState([]);
  const [newItemList, setNewItemList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [renderNewItem, setRenderNewItem] = useState(true);
  const [toggleNext, setToggleNext] = useState(true);

  const { httpRequest, error, dataLength } = useFetch();

  const token = localStorage.getItem('token');
  const objForSkeletonUi = [...Array(dataLength).keys()];
  const url_rawData = `http://52.15.84.15:8000/jobs/private?offset=${page}&limit=${LIMIT}`;
  const url_filtered = `http://52.15.84.15:8000/jobs/private${queryString}`;

  const newListHandler = data => {
    setNewItemList([
      ...data.map(item => {
        return {
          id: item.id,
          jobName: item.name,
          company: item.company,
          location: item.location,
          years: item.years,
          like: item.follow,
          url: item.url,
        };
      }),
    ]);
  };

  const changeItemList = id => {
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

  const loadingUIHandler = value => {
    setIsLoading(value);
  };

  const intersectionObserver = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && queryString.length === 0) {
            observer.unobserve(entry.target);
            loadingUIHandler(true);
            setRenderNewItem(true);
            setPage(prevState => prevState + LIMIT);
            setToggleNext(prevState => !prevState);

            setTimeout(() => {
              loadingUIHandler(false);
            }, 2000);
          }
        });
      },
      {
        threshold: 0.8,
      }
    );
  }, []);

  useEffect(() => {
    httpRequest(
      {
        url: url_rawData,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
      newListHandler
    );
  }, [toggleNext]);

  useEffect(() => {
    setItemList([]);
    setPage(0);
    httpRequest(
      {
        url: url_filtered,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
      newListHandler
    );
    intersectionObserver.disconnect();
  }, [url_filtered]);

  useEffect(() => {
    const jobItemList = document.querySelectorAll('.jobItem');
    if (jobItemList.length !== 0) {
      const lastJobItem = jobItemList[jobItemList.length - 1];
      intersectionObserver.observe(lastJobItem);
    }
  }, [intersectionObserver, itemList]);

  useEffect(() => {
    if (!isLoading) {
      setItemList(prevState => {
        return [...prevState, ...newItemList];
      });
      setRenderNewItem(false);
    }
  }, [isLoading, newItemList]);

  return (
    <ItemListContainer>
      {error && (
        <>
          <ErrorMessage>데이터 송/수신에 문제가 발생했습니다.</ErrorMessage>
          <ErrorMessage>{error.message}</ErrorMessage>
        </>
      )}
      <ItemList>
        {itemList.map(item => {
          return (
            <JobItem
              key={item.id}
              item={item}
              onChangeList={changeItemList}
              token={token}
            />
          );
        })}
        {isLoading
          ? objForSkeletonUi.map(item => {
              return <SkeletonUi key={item} />;
            })
          : renderNewItem
          ? newItemList.map(item => {
              return (
                <JobItem
                  key={item.id}
                  item={item}
                  onChangeList={changeItemList}
                />
              );
            })
          : null}
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

const LIMIT = 12;
