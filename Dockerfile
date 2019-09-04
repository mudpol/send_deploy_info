FROM node:8.16-alpine

WORKDIR /home/node/

COPY teamcity-push-gw-proxy/ $WORKDIR

RUN npm config set package-lock false &&\
    npm install request express

ENV PORT 9100

EXPOSE $PORT

USER node

ENTRYPOINT ["/bin/sh"]

CMD ["start_proxy.sh"]
