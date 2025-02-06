# to do : add support for ENVs

FROM node:20

WORKDIR /app

# to add missing libnss3 file needed for chromium
RUN apt update -y && apt search libnss3 && apt install -y libnss3

COPY package* .

RUN npm install

COPY . .

ENV NEXTAUTH_URL=http://localhost:3000/

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]