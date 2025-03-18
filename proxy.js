const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Serve static files
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // Serve CSS files
  if (req.url.endsWith('.css')) {
    const cssPath = path.join(__dirname, req.url);
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('CSS file not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
    return;
  }

  // Serve JavaScript files
  if (req.url.endsWith('.js')) {
    const jsPath = path.join(__dirname, req.url);
    fs.readFile(jsPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('JavaScript file not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
    return;
  }

  // Proxy API requests
  if (req.url.startsWith('/api/')) {
    // Remove the /api prefix
    req.url = req.url.replace(/^\/api/, '');
    
    // Forward the request to the API server
    proxy.web(req, res, {
      target: 'http://localhost:8000',
      changeOrigin: true
    });
    return;
  }

  // Handle 404
  res.writeHead(404);
  res.end('Not found');
});

// Start the server
const PORT = 8082;
server.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});