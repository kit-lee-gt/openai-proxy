"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WHITELIST_API_ENDPOINTS = exports.OPENAI_ORGANIZATION_ID = exports.OPENAI_API_KEY = exports.OPENAI_API_HOST = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MANDATORY_ENVS = [
    'OPENAI_API_KEY'
];
for (const env of MANDATORY_ENVS) {
    if (!process.env[env]) {
        throw new Error(`Missing env ${env}`);
    }
}
exports.PORT = process.env.PORT || 3000;
exports.OPENAI_API_HOST = 'https://api.openai.com';
exports.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
exports.OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID;
exports.WHITELIST_API_ENDPOINTS = [
    '/v1/models',
    '/v1/chat/completions'
];
