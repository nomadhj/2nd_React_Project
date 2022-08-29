import { useState, useCallback } from 'react';

const useFetch = () => {
  const [error, setError] = useState(false);
  const [dataLength, setDataLength] = useState(0);

  const httpRequest = useCallback(async (requestConfig, dataHandler) => {
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
      setDataLength(data.result.length);
      dataHandler(data.result);
    } catch (error) {
      setError(error);
    }
  }, []);

  return {
    error: error,
    httpRequest: httpRequest,
    dataLength: dataLength,
  };
};

export default useFetch;
