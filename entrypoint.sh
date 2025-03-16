#!/bin/bash

# Get the API URL from environment variable or use default
API_URL=${API_URL:-"http://localhost:8000"}

# Replace any API URL in the index.html file with the environment variable
sed -i "s|value=\"https://[^\"]*\"|value=\"$API_URL\"|g" /usr/share/nginx/html/index.html

# Create a proxy configuration for nginx
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # Proxy for PDF statements
    location /proxy/statements/ {
        resolver 127.0.0.11 valid=30s;
        set \$upstream_api http://api:8000;
        
        # Extract the account_id and statement_date from the URL
        rewrite ^/proxy/statements/(.+)/(.+)\.pdf$ /bank/statements/\$1/\$2.pdf break;
        
        # Forward the request to the API with authentication headers
        proxy_pass \$upstream_api;
        proxy_set_header X-Client-ID \$http_x_client_id;
        proxy_set_header X-Client-Secret \$http_x_client_secret;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    # Regular location
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

# Execute the CMD
exec "$@"