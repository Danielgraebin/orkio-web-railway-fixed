# Orkio Web — Vite/React (GitHub + Railway)

## Dev
```bash
npm i
VITE_API_BASE_URL=http://localhost:8000/api/v1 npm run dev
```

## Build local
```bash
VITE_API_BASE_URL=https://<orkio-api>.up.railway.app/api/v1 npm run build
```

## Docker local
```bash
docker build -t orkio-web .
docker run -p 8080:8080 orkio-web
# /health -> ok
```

## Deploy no Railway (via GitHub)
1. Crie repo **orkio-web** e faça push.
2. No Railway: **New Project → Deploy from GitHub**.
3. Configure **Build Variables**: `VITE_API_BASE_URL=https://<orkio-api>.up.railway.app/api/v1`.
4. Deploy automático em push para `main`.

### (Opcional) Deploy via GitHub Actions
- Secrets requeridos:
  - `VITE_API_BASE_URL` (para etapa de build)
  - `RAILWAY_TOKEN`, `RAILWAY_PROJECT_ID`, `RAILWAY_SERVICE_ID` (para deploy)


## Build no Railway (fix)
Este pacote usa `npm i` no Dockerfile (sem lockfile) para evitar falhas `npm ci` quando o lock não está sincronizado.
Defina `VITE_API_BASE_URL` como Build Variable no Railway.
