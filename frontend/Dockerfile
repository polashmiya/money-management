FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx:1.20.0-alpine
COPY --from=build /app/dist/moneymanagement/ /usr/share/nginx/html
EXPOSE 80
