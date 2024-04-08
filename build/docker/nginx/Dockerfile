FROM node:lts-alpine as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . /app
RUN npm run build


FROM nginx:stable-alpine as prod

COPY --from=dev /app/dist /usr/share/nginx/html
COPY --from=dev /app/build/docker/nginx/entrypoint.sh /entrypoint.sh

CMD ["/entrypoint.sh"]
