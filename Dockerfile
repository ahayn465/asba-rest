FROM node:argon

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install dependencies
COPY package.json /usr/src/app
RUN npm install

#bundle app source
COPY . /usr/src/app

EXPOSE 4200
CMD ["npm", "start"]
