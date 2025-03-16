# API Sandbox Deployment Guide

This guide provides detailed instructions for deploying the Test Sahl API Sandbox to Render.

## What is the API Sandbox?

The API Sandbox is an interactive web interface that allows users to test the Sahl Bank API without writing code. It provides a user-friendly way to:

- Explore all available API endpoints
- Send requests with different parameters
- View detailed responses
- Test authentication and error handling

## Deployment Options

### Option 1: Deploy Using the Script

The easiest way to deploy both the API and Sandbox is using the provided script:

```bash
# Make the script executable
chmod +x deploy_sandbox_to_render.sh

# Run the deployment script
./deploy_sandbox_to_render.sh
```

This script will guide you through the deployment process by:
1. Providing step-by-step instructions for using the Render Blueprint feature
2. Offering to open the Render dashboard in your browser
3. Explaining what to expect after deployment

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. **Create a new Web Service in Render**:
   - Log in to your Render account
   - Click "New" and select "Web Service"
   - Connect your Git repository
   - Configure the service:
     - Name: `sahl-api-sandbox`
     - Environment: `Docker`
     - Build Command: Leave empty (uses Dockerfile)
     - Root Directory: `api-sandbox`
     - Add environment variables:
       - `API_URL`: `https://sahl-bank-api.onrender.com` (or your API URL)

2. **Deploy the service**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your Sandbox

## Customization

### Changing the API URL

The Sandbox is configured to connect to the API at `https://sahl-bank-api.onrender.com` by default. If you've deployed your API to a different URL, you can change this by:

1. Updating the `API_URL` environment variable in the Render dashboard
2. The entrypoint script will automatically update the HTML to use this URL

### Custom Domain

To use a custom domain for your Sandbox:

1. Go to your web service settings in Render
2. Under "Custom Domains", add your domain
3. Configure DNS records for your domain to point to your Render service

## Troubleshooting

### CORS Issues

If you encounter CORS issues when the Sandbox tries to connect to the API:

1. Ensure your API allows requests from the Sandbox domain
2. Add the following headers to your API responses:
   ```
   Access-Control-Allow-Origin: https://sahl-api-sandbox.onrender.com
   Access-Control-Allow-Headers: X-Client-ID, X-Client-Secret, Content-Type
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   ```

### Connection Issues

If the Sandbox can't connect to the API:

1. Verify that the API is running and accessible
2. Check that the API URL is correct in the Sandbox
3. Ensure there are no network restrictions blocking the connection

## Maintenance

The Sandbox is a static site, so it requires minimal maintenance. However, if you make changes to the API:

1. Update the Sandbox code to reflect any new endpoints or parameters
2. Redeploy the Sandbox to Render

## Support

For any questions or issues with the API Sandbox deployment, please contact support@sahlfinancial.com.