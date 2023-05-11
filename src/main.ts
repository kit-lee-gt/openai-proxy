import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import morgan from 'morgan';
import { OPENAI_API_HOST, OPENAI_API_KEY, OPENAI_ORGANIZATION_ID, PORT, WHITELIST_API_ENDPOINTS } from './config';

const app = express();

app.use('*', cors({
  origin: (origin, callback) => {
    callback(null, true);
  }
}));
app.use(morgan('short'));

app.use((req, res, next) => {
  if (WHITELIST_API_ENDPOINTS.includes(req.path)) {
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

const headers: Record<string, string> = {
  'Authorization': `Bearer ${OPENAI_API_KEY}`
};

if (OPENAI_ORGANIZATION_ID) {
  headers['OpenAI-Organization'] = OPENAI_ORGANIZATION_ID;
}

app.use('/v1', createProxyMiddleware({
  secure: true,
  target: OPENAI_API_HOST,
  changeOrigin: true,
  headers
}));

app.use('/', (req, res) => {
  return res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});