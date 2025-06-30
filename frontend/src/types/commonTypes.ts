export const enum RequestMethod {
  GET = 'GET',
  POST = 'POST'
}

export interface ApiConfig {
  uri: string;
  method: RequestMethod;
  body?: any;
}

export interface ContextType {
  screen?: Screens;
}

export enum Screens {
  IOTD = 'IOTD',
  ASTEROID_DATA = 'ASTEROID',
  NATURAL_EVENTS = 'NATURAL_EVENTS',
  HIDE = ''
}