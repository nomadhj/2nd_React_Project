import { useState, useCallback } from 'react';

const useFetch = () => {
  const [isLoading, setIsLodaing] = useState(false);
  const [error, setError] = useState(false);

  const httpRequest = useCallback(async (requestConfig, dataHandler) => {
    setIsLodaing(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: JSON.stringify(requestConfig.body)
          ? JSON.stringify(requestConfig.body)
          : null,
      });
      const data = await response.json();
      dataHandler(data);
    } catch (error) {
      setError(error);
    }
    setIsLodaing(false);
  }, []);

  return {
    httpRequest,
    isLoading,
    error,
  };
};

export default useFetch;
