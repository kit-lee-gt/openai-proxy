import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import morgan from 'morgan';
import { OPENAI_API_HOST, OPENAI_API_KEY, OPENAI_ORGANIZATION_ID, PORT, WHITELIST_API_ENDPOINTS } from './config';

const app = express();

app.use(cors());
app.use(morgan('short'));

app.use((req, res, next) => {
  if (WHITELIST_API_ENDPOINTS.includes(req.path)) {
    return next();
  }
  res.status(404).end();
});

/* TODO implement authorization */
// app.use((req, res, next) => {
//   const ipAddress = req.ip;
//   console.info('ipAddress', ipAddress);
//   next();
// });

const headers: Record<string, string> = {
  'Authorization': `Bearer ${OPENAI_API_KEY}`
};

if (OPENAI_ORGANIZATION_ID) {
  headers['OpenAI-Organization'] = OPENAI_ORGANIZATION_ID;
}

app.use(
  createProxyMiddleware({
    secure: false,
    target: OPENAI_API_HOST,
    changeOrigin: true,
    headers
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});