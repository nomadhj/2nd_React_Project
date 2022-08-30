import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLodaing] = useState(false);
  const [error, setError] = useState(false);
  const [dataLength, setDataLength] = useState(0);

  const httpRequest = async (requestConfig, dataHandler) => {
    setIsLodaing(true);
    setError(null);
    setDataLength(0);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: JSON.stringify(requestConfig.body)
          ? JSON.stringify(requestConfig.body)
          : null,
      });
      const data = await response.json();
      setDataLength(data.length);
      dataHandler(data);
    } catch (error) {
      setError(error);
    }
    setIsLodaing(false);
  };

  return {
    httpRequest,
    isLoading,
    error,
    dataLength,
  };
};

export default useFetch;
