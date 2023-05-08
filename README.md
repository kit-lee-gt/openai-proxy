# OpenAI Proxy

OpenAI API proxy server

## Prerequisites
- OpenAI API key (Obtain yours from [here](https://platform.openai.com/account/api-keys/))
- Node.js
- pnpm

## Preparation
1. Copy `.env.example` to `.env`
2. Set `OPENAI_API_KEY` with your OpenAI API key
3. Set `OPENAI_ORGANIZATION_ID` with your organization ID
4. Set `PORT` with the proxy server port if necessary 

## Install dependencies
```bash
pnpm install
```

## Development
```bash
pnpm dev
```

## Distribution
```bash
pnpm build
pnpm start
```

## Run in Docker
```bash
pnpm docker
```
