import express from "express";
import { fetchData, getErrorMessage } from "../util/api";
import { asteroidApi, tleApiConfig } from "../config/apiConfig";
import { TLEResponse, AsteriodDataResponse } from "../constants/types/ApiTypes";
import { getSatelliteData } from "../helper/SatelliteDataHelper";


const router = express.Router();

let cacheResponse: TLEResponse;

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


router.post("/astroid", async (req, res) => {
  console.log("APIROUTES: Fetching astroid data");
  try {
    let astroidData: AsteriodDataResponse;
    astroidData = await fetchData(asteroidApi(req.body.start_date,req.body.end_date));

    console.log("APIROUTES: Fetching satellite data - Success");
    const response = getSatelliteData(tleData);
    res.json(response);
  } catch (err) {
    res.status(400);
    console.log("APIROUTES: Fetching satellite data - Failure");
    res.json(getErrorMessage(err));
  }
});


export default router;
