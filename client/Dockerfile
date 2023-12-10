FROM node:lts-alpine
ENV NODE_ENV=develop
#USER node
WORKDIR /app
COPY   ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY public/ /app/public
COPY src/ /app/src
COPY   . .
#--chown=node:node
EXPOSE 3000
#RUN chown -R node /usr/src/app
CMD ["npm", "start"]