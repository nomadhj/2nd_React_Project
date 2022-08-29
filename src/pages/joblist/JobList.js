import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import JobItemList from './components/JobItemList';

const JobList = () => {
  const [queryString, setQueryString] = useState([]);

  const onChangeFilter = useCallback(value => {
    setQueryString(value);
  }, []);

  return (
    <MainContainer>
      <Navbar onChangeFilter={onChangeFilter} />
      <JobItemList queryString={queryString} />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default JobList;
