FROM node:8.16-alpine

COPY send_deploy_info/ /home/

EXPOSE 3500

WORKDIR /home/

ENTRYPOINT ["/bin/sh"]

CMD ["/home/start_parser.sh"]
