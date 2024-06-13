FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . ./
ENTRYPOINT ["npm", "run", "start:dev",]
