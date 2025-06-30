import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  GeodeticLocation,
} from "satellite.js";
import {
  AsteriodDataResponse,
  AsteroidData,
  TLEResponse,
} from "../constants/types/ApiTypes";
import { SatelliteData } from "../constants/types/ApiTypes";

export const getSatelliteData = (tleResponse: TLEResponse): SatelliteData[] => {
  const satelliteData: SatelliteData[] = [];
  tleResponse?.member.forEach((val) => {
    let position: GeodeticLocation;
    const line1 = val?.line1;
    const line2 = val?.line2;
    const satelliteRecord = twoline2satrec(line1, line2);
    const positionAndVelocity = propagate(satelliteRecord, new Date());
    if (positionAndVelocity && positionAndVelocity.position) {
      const gmst = gstime(new Date());
      position = eciToGeodetic(positionAndVelocity.position, gmst);
      satelliteData.push({
        name: val?.name,
        id: val?.satelliteId,
        latitude: (position.latitude * 180) / Math.PI,
        longitude: (position.longitude * 180) / Math.PI,
        height: position.height,
      });
    }
  });
  return satelliteData;
};

const getAverageDiameter = (min: number, max: number): number =>
  Math.round(((min + max) * 100) / 2) / 100;

const convertStringToNumber = (str: string): number =>
  !isNaN(parseFloat(str)) ? Math.round(parseFloat(str) * 100) / 100 : 0;

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}, ${month} ${day}`;
};

export const getAsteroidData = (
  asteroidResponse: AsteriodDataResponse
): AsteroidData[] => {
  let response: AsteroidData[] = [];
  const objects = asteroidResponse.near_earth_objects;
  console.log(objects);
  Object.keys(objects).forEach((val) => {
    objects[val].forEach((asteroid) => {
      response.push({
        id: asteroid?.id,
        url: asteroid?.nasa_jpl_url,
        name: asteroid?.name,
        approachDate: formatDate(
          asteroid?.close_approach_data[0].close_approach_date
        ),
        estimatedDiameter: getAverageDiameter(
          asteroid?.estimated_diameter?.kilometers?.estimated_diameter_min,
          asteroid?.estimated_diameter?.kilometers?.estimated_diameter_max
        ),
        isHazardous: asteroid?.is_potentially_hazardous_asteroid,
        missDistance: convertStringToNumber(
          asteroid?.close_approach_data[0]?.miss_distance?.kilometers
        ),
        relativeVelocity: convertStringToNumber(
          asteroid?.close_approach_data[0]?.relative_velocity
            ?.kilometers_per_second
        ),
      });
    });
  });
  console.log(response);
  response = response.filter(
    (val) =>
      val.missDistance !== 0 &&
      val.relativeVelocity !== 0 &&
      val.estimatedDiameter !== 0
  );
  console.log(response);
  response.sort((a, b) => (b.isHazardous ? 1 : 0) - (a.isHazardous ? 1 : 0));
  return response;
};

export const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
