import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchModal = ({ isShownSearchBar, setIsShownSearchBar }) => {
  const [inputText, setInputText] = useState('');
  const [searchLog, setSearchLog] = useState([]);
  const [logId, setLogId] = useState(0);

  const navigate = useNavigate();

  const logLength = 5;

  const closeHandler = () => {
    setIsShownSearchBar(false);
  };

  const submitHandler = event => {
    event.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    } else {
      navigate(`/search?${inputText}`);
      setSearchLog(prevState => {
        return [{ id: logId, text: inputText }, ...prevState];
      });
      setLogId(prevState => (prevState + 1) % (logLength + 1));
      setInputText('');
    }
  };

  const inputHandler = event => {
    setInputText(event.target.value);
  };

  const deleteAllHandler = () => {
    setSearchLog([]);
  };

  const deleteItemHandler = id => {
    setSearchLog(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  };

  useEffect(() => {
    if (searchLog.length > logLength) {
      setSearchLog(prevState => {
        return [...prevState.slice(0, -1)];
      });
    }
  }, [searchLog]);

  return (
    isShownSearchBar && (
      <>
        <Backdrop onClick={closeHandler} />
        <ModalSection>
          <InputSection onSubmit={submitHandler}>
            <SearchIcon />
            <SearchInput
              type="search"
              autoFocus={true}
              placeholder="회사명 검색"
              value={inputText}
              onChange={inputHandler}
            />
          </InputSection>
          <SearchLog>
            <SearchLogControl>
              <SearchLogTitle>최근 검색 기록</SearchLogTitle>
              <DeleteAllBtn onClick={deleteAllHandler}>전체삭제</DeleteAllBtn>
            </SearchLogControl>
            <SearchLogList>
              {searchLog.map(item => {
                return (
                  <SearchLogItem key={item.id}>
                    <StyledLink to={`/search?${item.text}`}>
                      {item.text}
                    </StyledLink>
                    <DeleteItemBtn
                      onClick={() => {
                        deleteItemHandler(item.id);
                      }}
                    >
                      X
                    </DeleteItemBtn>
                  </SearchLogItem>
                );
              })}
            </SearchLogList>
          </SearchLog>
        </ModalSection>
      </>
    )
  );
};

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalSection = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
  z-index: 200;
`;

const InputSection = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50px;
  margin: 30px 0 50px 0;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: auto;
  left: 30px;
`;

const SearchInput = styled.input.attrs(({ type, autoFocus, placeholder }) => {
  return {
    type: type,
    autoFocus: autoFocus,
    placeholder: placeholder,
  };
})`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 20px 0 50px;
  margin-left: 10px;
  border: none;
  border-radius: 25px;
  background-color: rgb(241, 244, 247);
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.fontGray};
    font-size: 16px;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.primaryBlue};
    background-color: white;
  }
`;

const SearchLog = styled.div`
  width: 80%;
`;

const SearchLogControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchLogTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const DeleteAllBtn = styled.button`
  border: none;
  background-color: white;
  color: ${({ theme }) => theme.fontGray};
  cursor: pointer;
`;

const SearchLogList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
`;

const SearchLogItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: rgb(249, 249, 249);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-bottom: 10px;
  padding: 4px;
  color: black;
  font-size: 16px;
  text-decoration: none;
`;

const DeleteItemBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default SearchModal;
