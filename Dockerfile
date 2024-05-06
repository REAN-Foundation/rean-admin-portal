FROM node:18.12.0-alpine3.16 AS builder

WORKDIR /app
COPY . .

RUN npm install -g typescript
RUN npm install
RUN npm run build

#######################################

FROM node:18.12.0-alpine3.16

RUN apk add bash
RUN apk add --no-cache \
        python3 \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk
# RUN apk add chromium \
#     harfbuzz
# RUN apk --no-cache add aws-cli

RUN apk update
RUN apk upgrade

WORKDIR /app
# RUN rm -rf ./*

COPY --from=builder ./app/ ./
# COPY --from=builder ./app/build .
# COPY --from=builder ./app/entrypoint.sh ./

RUN npm install

# # COPY . /app

# CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]

# RUN chmod +x /app/entrypoint.sh
# ENTRYPOINT ["/bin/bash", "-c", "/app/entrypoint.sh"]
ENV ORIGIN=http://35.154.171.205

CMD ["node", "build/index.js"]
