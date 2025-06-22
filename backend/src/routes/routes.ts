import express from "express";
import { fetchData, getErrorMessage } from "../util/api";
import { tleApiConfig } from "../config/apiConfig";
import { TLEResponse } from "../constants/types/ApiTypes";
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

export default router;
