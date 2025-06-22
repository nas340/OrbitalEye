import { ApiConfig } from "../constants/types/commonTypes"

export const fetchData = async (apiConfig: ApiConfig) => {
    try {
        const data = await fetch(apiConfig.uri, {
            method: apiConfig.method
        });
        return await data.json();
    } catch (err) {
        throw err;
    }

}

export const getErrorMessage = (err: any) => {
    return {
        "error": {
            "errorMessage": err.code
        }
    }
}