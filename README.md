# Sahl API Sandbox

This repository contains the Sahl API Sandbox, an interactive web interface for testing the Sahl Bank API without writing code.

## Features

- Interactive UI for testing all Sahl Bank API endpoints
- Pre-filled example values for quick testing
- Real-time response display
- Support for downloading PDF statements

## Getting Started

### Prerequisites

- Node.js and npm (for development)
- Docker (for containerized deployment)

### Running Locally

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sahl-api-sandbox.git
   cd sahl-api-sandbox
   ```

2. Serve the static files using any HTTP server:
   ```
   # Using Python's built-in HTTP server
   python -m http.server 8080
   
   # Or using Node.js http-server
   npx http-server -p 8080
   ```

3. Access the sandbox at http://localhost:8080

### Running with Docker

1. Build the Docker image:
   ```
   docker build -t sahl-api-sandbox .
   ```

2. Run the container:
   ```
   docker run -p 8080:80 -e API_URL=http://localhost:8000 sahl-api-sandbox
   ```

3. Access the sandbox at http://localhost:8080

## Deployment

### Deploying to Render

Use the provided script to deploy to Render:

```
./deploy_sandbox_to_render.sh
```

This will guide you through the process of deploying the sandbox to Render.

## Configuration

The sandbox is configured to connect to the API at the URL specified by the `API_URL` environment variable. By default, it connects to `https://sahl-bank-api.onrender.com`.

To change the API URL:

1. When running with Docker, set the `API_URL` environment variable:
   ```
   docker run -p 8080:80 -e API_URL=https://your-api-url.com sahl-api-sandbox
   ```

2. When deploying to Render, update the `API_URL` environment variable in the Render dashboard or in the `render.yaml` file.

## Communication with API

This sandbox is designed to work with the [Sahl API](https://github.com/yourusername/sahl-api), which provides the backend functionality for financial data processing.

The sandbox makes cross-origin requests to the API, which must have CORS configured to allow requests from the sandbox domain.

## License

[Your License Here]