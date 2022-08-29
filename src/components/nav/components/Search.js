import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch';

const Search = () => {
  const [itemList, setItemList] = useState([]);

  const [isValidKeyword, setIsValidKeyword] = useState(false);

  const { httpRequest } = useFetch();

  const navigation = useNavigate();
  const location = useLocation();

  const url_search = `http://52.15.84.15:8000/jobs/private?search=${location.search.slice(
    1
  )}`;
  const url_likeData = id => {
    return `http://52.15.84.15:8000/jobs/${id}/follow`;
  };

  const goToDetail = id => {
    navigation(`/jobdetail/${id}`);
  };

  const likeHandler = id => {
    setItemList(prevState => {
      return [
        ...prevState.map(item => {
          if (item.id === id) {
            return { ...item, like: !item.like };
          } else {
            return item;
          }
        }),
      ];
    });

    httpRequest({
      url: url_likeData(id),
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  };

  const listHandler = data => {
    setItemList([
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

  useEffect(() => {
    httpRequest(
      {
        url: url_search,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
      listHandler
    );
  }, [httpRequest, location, url_search]);

  useEffect(() => {
    if (itemList.length === 0) {
      setIsValidKeyword(false);
    } else {
      setIsValidKeyword(true);
    }
  }, [itemList]);

  return (
    <SearchResult>
      <SearchResultTitle>
        {`검색어 : ${decodeURI(location.search.slice(1))}`}
      </SearchResultTitle>
      <SearchResultSection>
        {!isValidKeyword && (
          <InvalidSearchResult>
            검색 내용과 일치하는 결과가 없습니다.
          </InvalidSearchResult>
        )}
        {isValidKeyword && (
          <SearchedResultList>
            <SearchedResultTitle>{`검색결과 ${itemList.length}`}</SearchedResultTitle>
            <SearchedResultItems>
              {itemList.map(item => (
                <SearchedResultItem
                  key={item.id}
                  onClick={() => {
                    goToDetail(item.id);
                  }}
                >
                  <ImgContainer>
                    <LogoImg src={item.url} />
                  </ImgContainer>
                  <TextContainer>
                    <CompanyName>{item.jobName}</CompanyName>
                    <CompanyCategory>{item.company}</CompanyCategory>
                  </TextContainer>
                  <LikeButton
                    onClick={event => {
                      event.stopPropagation();
                      likeHandler(item.id);
                    }}
                    like={item.like}
                  >
                    좋아요
                  </LikeButton>
                </SearchedResultItem>
              ))}
            </SearchedResultItems>
          </SearchedResultList>
        )}
      </SearchResultSection>
    </SearchResult>
  );
};

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SearchResultTitle = styled.h1`
  width: 100%;
  height: 160px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  text-align: center;
  line-height: 160px;
  font-size: 48px;
`;

const SearchResultSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 160px);
  background-color: rgb(248, 248, 248);
  overflow: auto;
`;

const InvalidSearchResult = styled.div`
  margin-top: 50px;
  color: ${({ theme }) => theme.primaryBlue};
  font-size: 24px;
  font-weight: bold;
`;

const SearchedResultList = styled.div`
  width: 70%;
  padding: 20px 0;
`;

const SearchedResultTitle = styled.h2`
  margin: 40px 0 20px 0;
  font-size: 24px;
`;

const SearchedResultItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchedResultItem = styled.div`
  display: flex;
  align-items: center;
  width: 47%;
  margin: 10px;
  padding: 20px;
  background-color: white;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-right: 20px;
  overflow: hidden;
`;

const LogoImg = styled.img`
  height: 60px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
`;

const CompanyName = styled.p`
  margin-bottom: 4px;
  font-size: 18px;
`;

const CompanyCategory = styled.p`
  color: ${({ theme }) => theme.fontGray};
  font-size: 14px;
`;

const LikeButton = styled.button`
  width: 100px;
  height: 40px;
  margin: 0 0 0 auto;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  background-color: transparent;
  color: ${({ theme, like }) => (like ? 'red' : theme.primaryBlue)};

  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.primaryBlue};
  }
`;

export default Search;
