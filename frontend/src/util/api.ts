import { ApiConfig } from '../types/commonTypes';

export const fetchData = async (apiConfig: ApiConfig) => {
  try {
    const data = await fetch(apiConfig.uri, {
      method: apiConfig.method,
      body: JSON.stringify(apiConfig.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await data.json();
  } catch (err) {
    throw err;
  }
};

export const getErrorMessage = (err: any) => {
  return {
    error: {
      errorMessage: err.code,
    },
  };
};
