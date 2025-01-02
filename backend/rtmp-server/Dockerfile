FROM tiangolo/nginx-rtmp:latest

# Copy your custom nginx.conf (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Create log directory for RTMP
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/rtmp_access.log && \
    touch /var/log/nginx/rtmp_error.log

# Set permissions
RUN chmod -R 755 /var/log/nginx

EXPOSE 1935 80
CMD ["nginx", "-g", "daemon off;"]
