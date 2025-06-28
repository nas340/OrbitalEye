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

export interface AsteriodDataResponse {
   near_earth_objects: Record<string, NearEarthObjects[]>
}

export interface NearEarthObjects{
   estimated_diameter: {
    kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    }
   };
   is_potentially_harzardous_asterioid:boolean;
   close_approach_data: CloseApproachData[]
}

export interface CloseApproachData{
    relative_velocity: {
     kilometers_per_second : number;
    };
    miss_distance: {
        kilometers: number;
    };
}