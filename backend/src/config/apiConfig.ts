import { RequestMethod } from "../constants/types/commonTypes";

export const tleApiConfig = {
    uri: "https://tle.ivanstanojevic.me/api/tle",
    method: RequestMethod.GET
}

export const asteroidApi = (start_date:string,end_date:string)  => {
    return {
    uri:`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=5hdwANYWsfI0ak5kAWe4ZCwOO3C1zpI9FL6A76ku`,
    method: RequestMethod.POST
    }
}


