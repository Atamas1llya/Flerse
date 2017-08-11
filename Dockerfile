FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN NODE_ENV=production node_modules/.bin/webpack
CMD NODE_ENV=production npm start
EXPOSE 443
EXPOSE 80
