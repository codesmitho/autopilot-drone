# Builder stage: Use a specific version of the Golang Alpine image
FROM golang:1-alpine as builder

# Set the working directory for the build
WORKDIR /build/backend/rtmp-server

# Install build dependencies in a single layer
RUN apk update && apk add --no-cache ca-certificates curl build-base libtool musl-dev git \
    && update-ca-certificates \
    && rm -rf /var/cache/apk/*

# Copy go.mod and go.sum for dependency management
COPY go.mod go.sum ./

# Download and verify Go module dependencies
RUN go mod download && go mod verify

# Copy the rest of the application source code
COPY . .

# Build the Go binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /build/main ./

# Final stage: Prepare a minimal runtime image
FROM alpine:latest as final

# Install runtime dependencies
RUN apk add --no-cache ca-certificates dumb-init curl tzdata \
    && update-ca-certificates \
    && rm -rf /var/cache/apk/* \
    && adduser -D -s /bin/sh appuser

# Set the working directory
WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /build/main /app/main

# Set executable permissions on the binary
RUN chmod +x /app/main

# Use non-root user for running the application
USER appuser

# Expose the application port
EXPOSE 1935/tcp

# Use dumb-init as the entrypoint
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Command to run the application
CMD ["/app/main"]
