FROM node:lts-alpine3.15

ENV NODE_ENV=development

COPY ./docker-entrypoint.sh /usr/local/bin/
COPY ./dsync /usr/local/bin/
COPY ./register_ssh /usr/local/bin/
RUN apk add --no-cache openssh-client git yarn inotify-tools rsync
RUN mkdir -p /root/.ssh

# See https://github.com/Yelp/dumb-init.
RUN dumb_init_url=https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 && \
  wget -O /usr/local/bin/dumb-init $dumb_init_url \
  && chmod +x /usr/local/bin/dumb-init \
  && chmod +x /usr/local/bin/register_ssh \
  && chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/dumb-init", "docker-entrypoint.sh"]

WORKDIR /var/www/html