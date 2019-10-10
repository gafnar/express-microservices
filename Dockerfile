FROM node:11.8.0

RUN mkdir -p /app

WORKDIR /app

COPY . /app/

RUN npm install pm2 -g
RUN npm install

RUN ls -ls

EXPOSE 8080

CMD [ "pm2-runtime", "start", "pm2.config.yml", "--env", "local" ]