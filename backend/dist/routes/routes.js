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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../util/api");
const apiConfig_1 = require("../config/apiConfig");
const SatelliteDataHelper_1 = require("../helper/SatelliteDataHelper");
const router = express_1.default.Router();
let cacheResponse;
router.get("/satellite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("APIROUTES: Fetching satellite data");
    try {
        let tleData;
        if (!cacheResponse) {
            tleData = yield (0, api_1.fetchData)(apiConfig_1.tleApiConfig);
            cacheResponse = tleData;
        }
        else {
            tleData = cacheResponse;
        }
        console.log("APIROUTES: Fetching satellite data - Success");
        const response = (0, SatelliteDataHelper_1.getSatelliteData)(tleData);
        res.json(response);
    }
    catch (err) {
        res.status(400);
        console.log("APIROUTES: Fetching satellite data - Failure");
        res.json((0, api_1.getErrorMessage)(err));
    }
}));
exports.default = router;
