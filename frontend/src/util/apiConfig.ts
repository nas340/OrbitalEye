import { ApiConfig, RequestMethod } from '../types/commonTypes';

const microServiceUrl = import.meta.env.VITE_MSURI;

export const satelliteData: ApiConfig = {
  uri: microServiceUrl + '/api/satellite',
  method: RequestMethod.GET,
};

export const iotdData = (date?: string): ApiConfig => {
  return {
    uri: microServiceUrl + '/api/iotd',
    method: RequestMethod.POST,
    body: {
      date: date,
    },
  };
};

export const asteroidData = (startDate: string, endDate: string): ApiConfig => {
  return {
    uri: `${microServiceUrl}` + '/api/asteroid',
    method: RequestMethod.POST,
    body: { startDate, endDate },
  };
};
