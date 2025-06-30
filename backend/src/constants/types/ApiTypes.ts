export interface TLEResponse {
  "@id": string;
  totalItems: number;
  member: Member[];
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

export interface IOTDResponse {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
}

export interface AsteriodDataResponse {
  near_earth_objects: Record<string, NearEarthObjects[]>;
}

export interface NearEarthObjects {
  id: string;
  nasa_jpl_url: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}

export interface CloseApproachData {
  relative_velocity: {
    kilometers_per_second: string;
  };
  miss_distance: {
    kilometers: string;
  };
  close_approach_date: string;
}

export interface AsteroidData {
  id: string;
  name: string;
  estimatedDiameter: number;
  isHazardous: boolean;
  relativeVelocity: number;
  missDistance: number;
  url: string;
  approachDate: string;
}

export interface NaturalEventResponse {
  events: Events[];
}

export interface Events {
  closed: string;
}