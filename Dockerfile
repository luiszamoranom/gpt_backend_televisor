FROM node:20.11.0-alpine3.18
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
npm install -g prisma
RUN prisma db pull
CMD [ "npm", "start" ]