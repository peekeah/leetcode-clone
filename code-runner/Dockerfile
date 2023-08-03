#### Docker image for code-runner ####

FROM python:3.12.0b1-slim-bullseye


RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

RUN apt-get install openjdk-11-jre -y

WORKDIR /code-runner

COPY . .

RUN npm install 

CMD ["npm", "run", "start"]

EXPOSE $PORT