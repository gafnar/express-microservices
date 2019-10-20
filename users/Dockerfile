FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN mv .env.example .env && npm install

EXPOSE 3000

CMD ["npm", "run", "start"]