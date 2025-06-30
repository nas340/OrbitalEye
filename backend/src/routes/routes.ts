import express from "express";
import { fetchData, getErrorMessage } from "../util/api";
import {
  IOTDApiConfig,
  asteroidApi,
  naturalEventApi,
  tleApiConfig,
} from "../config/apiConfig";
import {
  IOTDResponse,
  TLEResponse,
  AsteriodDataResponse,
  AsteroidData,
  NaturalEventResponse,
} from "../constants/types/ApiTypes";
import {
  getAsteroidData,
  getGraphData,
  getSatelliteData,
  getTodayDateString,
} from "../helper/SatelliteDataHelper";

const router = express.Router();

let cacheResponse: TLEResponse;
let iotdCache: IOTDResponse | undefined;
let asteroidCache: AsteriodDataResponse | undefined;
let naturalEventCache: NaturalEventResponse | undefined;

router.get("/satellite", async (req, res) => {
  console.log("APIROUTES: Fetching satellite data");
  try {
    let tleData: TLEResponse;
    if (!cacheResponse) {
      tleData = await fetchData(tleApiConfig);
      cacheResponse = tleData;
    } else {
      tleData = cacheResponse;
    }
    console.log("APIROUTES: Fetching satellite data - Success");
    const response = getSatelliteData(tleData);
    res.json(response);
  } catch (err) {
    res.status(400);
    console.log("APIROUTES: Fetching satellite data - Failure");
    res.json(getErrorMessage(err));
  }
});

router.post("/iotd", async (req, res) => {
  console.log("APIROUTES: Fetching IOTD");
  try {
    let IOTDResponse: IOTDResponse;
    let date = req?.body?.date;
    if (!date) {
      date = getTodayDateString();
    }
    if (!iotdCache) {
      IOTDResponse = await fetchData(IOTDApiConfig(date));
    } else {
      IOTDResponse = iotdCache;
    }
    console.log("APIROUTES: Fetching IOTD data - Success");
    res.json(IOTDResponse);
  } catch (err) {
    res.status(400);
    console.log("APIROUTES: Fetching IOTD data - Failure", err);
    res.json(getErrorMessage(err));
  }
});

router.post("/asteroid", async (req, res) => {
  console.log("APIROUTES: Fetching astroid data");
  try {
    let asteroidData: AsteriodDataResponse;
    if (!asteroidCache) {
      asteroidData = await fetchData(
        asteroidApi(req.body.startDate, req.body.endDate)
      );
    } else {
      asteroidData = asteroidCache;
    }
    console.log("APIROUTES: Fetching satellite data - Success");
    const response = getAsteroidData(asteroidData);
    res.json(response);
  } catch (err) {
    res.status(400);
    console.log("APIROUTES: Fetching satellite data - Failure");
    res.json(getErrorMessage(err));
  }
});

router.get("/naturalevents", async (req, res) => {
  console.log("APIROUTES: Fetching natural event data");
  try {
    let naturalEvent: NaturalEventResponse;
    if (!naturalEventCache) {
      naturalEvent = await fetchData(naturalEventApi);
      naturalEventCache = naturalEvent;
    } else {
      naturalEvent = naturalEventCache;
    }
    const response = getGraphData(naturalEvent);
    res.json(response);
  } catch (err) {
    res.status(400);
    console.log("APIROUTES: Fetching natual event data - Failure");
    res.json(getErrorMessage(err));
  }
});

export default router;
