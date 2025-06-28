"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.fetchData = void 0;
const fetchData = (apiConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(apiConfig.uri, {
            method: apiConfig.method
        });
        return yield data.json();
    }
    catch (err) {
        throw err;
    }
});
exports.fetchData = fetchData;
const getErrorMessage = (err) => {
    return {
        "error": {
            "errorMessage": err.code
        }
    };
};
exports.getErrorMessage = getErrorMessage;
