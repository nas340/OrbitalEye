export const enum RequestMethod {
    GET = 'GET',
    POST = 'POST'
}

export interface ApiConfig {
    uri: string;
    method: RequestMethod;
}