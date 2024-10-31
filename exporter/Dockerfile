FROM node:20 as builder

# install FoundationDB client library
RUN wget -q https://github.com/apple/foundationdb/releases/download/7.1.60/foundationdb-clients_7.1.60-1_amd64.deb \
  && dpkg -i foundationdb-clients_7.1.60-1_amd64.deb \
  && rm foundationdb-clients_7.1.60-1_amd64.deb

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM node:20

# install FoundationDB client library
RUN wget -q https://github.com/apple/foundationdb/releases/download/7.1.60/foundationdb-clients_7.1.60-1_amd64.deb \
  && dpkg -i foundationdb-clients_7.1.60-1_amd64.deb \
  && rm foundationdb-clients_7.1.60-1_amd64.deb

# install older FoundationDB client library for compatibility with 6.3
RUN wget -q https://github.com/apple/foundationdb/releases/download/6.3.25/libfdb_c.x86_64.so \
 && mkdir -p /usr/lib/foundationdb/multiversion \
 && mv libfdb_c.x86_64.so /usr/lib/foundationdb/multiversion/libfdbc_6.3.25.so

# set up multi-version FoundationDB client
ENV FDB_NETWORK_OPTION_EXTERNAL_CLIENT_DIRECTORY /usr/lib/foundationdb/multiversion

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --prod

COPY --from=builder /app/build /app/build

ENTRYPOINT ["node", "build/index.js"]
