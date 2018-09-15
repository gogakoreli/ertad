# Stage 1
FROM node:10.4.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --prod

# Stage 2
FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/dist/front /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
