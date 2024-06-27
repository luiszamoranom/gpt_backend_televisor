FROM node:20.11.0-alpine3.18

WORKDIR /usr/app

# Instalar dependencias necesarias (como wget)
RUN apk add --no-cache wget bash
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 9999

RUN npm install -g prisma


RUN wget -O wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD sh -c 'while ! nc -z postgres 5432; do sleep 1; done; prisma migrate dev --name init ;npm start'