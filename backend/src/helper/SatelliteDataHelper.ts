import { twoline2satrec, propagate, gstime, eciToGeodetic, GeodeticLocation } from 'satellite.js';
import { TLEResponse } from '../constants/types/ApiTypes';
import { SatelliteData } from '../constants/types/ApiTypes';

export const getSatelliteData = (tleResponse: TLEResponse): SatelliteData[] => {
    const satelliteData: SatelliteData[] = [];
    tleResponse?.member.forEach(val => {
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
                latitude: position.latitude * 180 / Math.PI,
                longitude: position.longitude * 180 / Math.PI,
                height: position.height
            })
        }
    })
    return satelliteData;
}