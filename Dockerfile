FROM node:18.17.1-alpine3.18

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]