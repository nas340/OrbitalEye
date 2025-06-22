export interface TLEResponse {
    "@id": string;
    totalItems: number;
    member: Member[]
}

export interface Member {
    "@id": string;
    satelliteId: number;
    name: string;
    date: string;
    line1: string;
    line2: string;
}

export interface SatelliteData {
    name: string;
    id: number;
    latitude: number;
    longitude: number;
    height: number;
}