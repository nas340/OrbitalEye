import { ApiConfig, RequestMethod } from "../types/commonTypes"

const microServiceUrl = import.meta.env.msuri

export const satelliteData: ApiConfig = {
  uri: 'http://localhost:5000' + '/api/satellite',
  method: RequestMethod.GET
}