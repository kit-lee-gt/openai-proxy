"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use('*', (0, cors_1.default)({
    origin: (origin, callback) => {
        callback(null, true);
    }
}));
app.use((0, morgan_1.default)('short'));
app.use((req, res, next) => {
    if (config_1.WHITELIST_API_ENDPOINTS.includes(req.path)) {
        return next();
    }
    res.status(404).end();
});
// app.use((req, res, next) => {
//   console.info(req.ip);
//   const whitelist = [
//     '103.6.176.130',
//     '::ffff:127.0.0.1',
//     '::1'
//   ];
//   if (whitelist.indexOf(req.ip) >= 0) {
//     return next();
//   }
//   res.status(401).end();
// });
const headers = {
    'Authorization': `Bearer ${config_1.OPENAI_API_KEY}`
};
if (config_1.OPENAI_ORGANIZATION_ID) {
    headers['OpenAI-Organization'] = config_1.OPENAI_ORGANIZATION_ID;
}
app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
    secure: true,
    target: config_1.OPENAI_API_HOST,
    changeOrigin: true,
    headers
}));
app.listen(config_1.PORT, () => {
    console.log(`Listening on port ${config_1.PORT}`);
});
