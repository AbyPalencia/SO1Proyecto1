FROM golang:alpine

RUN apk update && apk add sysstat
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /Backend

EXPOSE 2000

CMD [ "/Backend" ]