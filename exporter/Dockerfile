FROM node:12 as builder

RUN wget -q https://www.foundationdb.org/downloads/6.2.7/ubuntu/installers/foundationdb-clients_6.2.7-1_amd64.deb \
 && dpkg -i foundationdb-clients_6.2.7-1_amd64.deb \
 && rm foundationdb-clients_6.2.7-1_amd64.deb

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM node:12

RUN wget -q https://www.foundationdb.org/downloads/6.2.7/ubuntu/installers/foundationdb-clients_6.2.7-1_amd64.deb \
 && dpkg -i foundationdb-clients_6.2.7-1_amd64.deb \
 && rm foundationdb-clients_6.2.7-1_amd64.deb

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --prod

COPY --from=builder /app/build /app/build

ENTRYPOINT ["node", "build/index.js"]
