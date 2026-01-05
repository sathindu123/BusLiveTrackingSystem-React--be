"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
//Multer = Node.js / Express වල file upload handle කරන middleware එකක්
// can disk or memory
// we choees memory
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage }); // storage: storage
