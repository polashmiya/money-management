FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 80
# CMD ["npm","start"]
RUN npm run build:prod

FROM nginx:1.20.0-alpine
COPY --from=build /app/dist/moneymanagement/ /usr/share/nginx/html
