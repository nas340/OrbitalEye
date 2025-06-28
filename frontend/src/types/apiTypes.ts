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

export interface AsteroidData {
  id: string;
  estimatedDiameter: number;
  isHazardous: boolean;
  relativeVelocity: number;
  missDistance: number;
  url: string;
  name: string;
  approachDate: string;
}
