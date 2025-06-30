import { ApiConfig, RequestMethod } from "../types/commonTypes"

const microServiceUrl = import.meta.env.VITE_MSURI;

export const satelliteData: ApiConfig = {
  uri: microServiceUrl + '/api/satellite',
  method: RequestMethod.GET
}

export const iotdData: ApiConfig = {
  uri: microServiceUrl + '/api/iotd',
  method: RequestMethod.GET
}

export const asteroidData = (startDate: string, endDate: string): ApiConfig => {
  return {
    uri: `${microServiceUrl}` + '/api/asteroid',
    method: RequestMethod.POST,
    body: { startDate, endDate }
  }
}