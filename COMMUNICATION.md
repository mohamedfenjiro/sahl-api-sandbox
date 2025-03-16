# Communication Between Sahl API Sandbox and Sahl API

This document explains how the Sahl API Sandbox communicates with the Sahl API.

## Overview

The Sahl API Sandbox provides a user-friendly interface for testing the Sahl API endpoints. The communication between the two is handled via HTTP requests from the Sandbox to the API.

## Communication Flow

1. The user interacts with the Sandbox UI
2. The Sandbox makes HTTP requests to the API endpoints
3. The API processes the requests and returns responses
4. The Sandbox displays the responses to the user

## Sandbox Configuration

The Sandbox is configured to make requests to the API at the URL specified by the `API_URL` environment variable. This is set in the `render.yaml` file:

```yaml
envVars:
  - key: API_URL
    value: https://sahl-bank-api.onrender.com
```

At runtime, the `entrypoint.sh` script replaces the API URL in the HTML file with the value from the environment variable:

```bash
# Replace any API URL in the index.html file with the environment variable
sed -i "s|value=\"https://[^\"]*\"|value=\"$API_URL\"|g" /usr/share/nginx/html/index.html
```

## API Requests

The Sandbox makes HTTP requests to the API using the Fetch API. For example, to get bank information:

```javascript
const response = await fetch(`${apiUrl}/bank/info`, {
    method: 'GET',
    headers: {
        'X-Client-ID': clientId,
        'X-Client-Secret': clientSecret
    }
});
```

## Authentication

The API requires client credentials for authentication. The Sandbox includes these credentials in the request headers:

```javascript
const headers = {
    'X-Client-ID': clientId,
    'X-Client-Secret': clientSecret,
    'Content-Type': 'application/json'
};
```

The client credentials are entered by the user in the Sandbox UI.

## CORS Considerations

The API must be configured to allow cross-origin requests from the Sandbox domain. This is typically done by setting the following headers in the API responses:

```
Access-Control-Allow-Origin: https://sahl-api-sandbox.onrender.com
Access-Control-Allow-Headers: X-Client-ID, X-Client-Secret, Content-Type
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

## Deployment Considerations

When deploying the Sandbox separately from the API, ensure that:

1. The API's CORS settings include the domain of the deployed Sandbox
2. The Sandbox's API_URL environment variable points to the deployed API
3. Both services are accessible to each other (no network restrictions)

## Testing the Communication

To test the communication between the Sandbox and the API:

1. Deploy both repositories to their respective URLs
2. Open the Sandbox in a web browser
3. Enter the client credentials
4. Use the Sandbox to make requests to the API
5. Verify that the responses are displayed correctly

## Troubleshooting

If the Sandbox cannot communicate with the API:

1. Check that the API URL is correct in the Sandbox
2. Verify that the API's CORS settings include the Sandbox domain
3. Ensure there are no network restrictions blocking the connection
4. Check the browser console for any error messages