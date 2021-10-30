FROM node:lts-alpine3.14 AS build
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build


FROM node:lts-alpine3.14
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=build app/dist ./dist
EXPOSE 3000 
CMD npm run start:prod