FROM nginx:1.15.8-alpine

COPY ./dist/restcountries /usr/share/nginx/html

