import { RequestMethod } from "../constants/types/commonTypes";

import dotenv from "dotenv";
dotenv.config();

const APIKEY = process.env.APIKEY

console.log("APIKEY", APIKEY);

export const tleApiConfig = {
  uri: "https://tle.ivanstanojevic.me/api/tle",
  method: RequestMethod.GET,
};

export const IOTDApiConfig = {
  uri: `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}`,
  method: RequestMethod.GET,
};

export const asteroidApi = (start_date: string, end_date: string) => {
  return {
    uri: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${APIKEY}`,
    method: RequestMethod.GET,
  };
};
