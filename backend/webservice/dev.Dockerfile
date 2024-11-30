FROM golang:latest

WORKDIR /build/backend

COPY go.mod go.sum .air.toml ./
RUN go mod download

RUN curl -fLo install.sh https://raw.githubusercontent.com/cosmtrek/air/master/install.sh \
    && chmod +x install.sh && sh install.sh && cp ./bin/air /bin/air

RUN go mod tidy

WORKDIR /build/backend

CMD air -d

EXPOSE 5000