FROM node:lts-alpine
ENV NODE_ENV=develop
#USER node
WORKDIR /usr/src/app
COPY   ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY   . .
#--chown=node:node
EXPOSE 4001
#RUN chown -R node /usr/src/app
CMD ["node", "index.js"]