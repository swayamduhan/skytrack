# to do : add support for ENVs

FROM node:20-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]