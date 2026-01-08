# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine

# ⚠️ CA certs para HTTPS no proxy_pass
RUN apk add --no-cache ca-certificates && update-ca-certificates

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
