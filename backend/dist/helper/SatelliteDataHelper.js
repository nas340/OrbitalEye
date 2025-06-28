"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSatelliteData = void 0;
const satellite_js_1 = require("satellite.js");
const getSatelliteData = (tleResponse) => {
    const satelliteData = [];
    tleResponse === null || tleResponse === void 0 ? void 0 : tleResponse.member.forEach(val => {
        let position;
        const line1 = val === null || val === void 0 ? void 0 : val.line1;
        const line2 = val === null || val === void 0 ? void 0 : val.line2;
        const satelliteRecord = (0, satellite_js_1.twoline2satrec)(line1, line2);
        const positionAndVelocity = (0, satellite_js_1.propagate)(satelliteRecord, new Date());
        if (positionAndVelocity && positionAndVelocity.position) {
            const gmst = (0, satellite_js_1.gstime)(new Date());
            position = (0, satellite_js_1.eciToGeodetic)(positionAndVelocity.position, gmst);
            satelliteData.push({
                name: val === null || val === void 0 ? void 0 : val.name,
                id: val === null || val === void 0 ? void 0 : val.satelliteId,
                latitude: position.latitude * 180 / Math.PI,
                longitude: position.longitude * 180 / Math.PI,
                height: position.height
            });
        }
    });
    return satelliteData;
};
exports.getSatelliteData = getSatelliteData;
