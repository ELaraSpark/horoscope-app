// start-proxy.js
const cors_proxy = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: []
}).listen(port, host, () => {
  console.log(`🚀 CORS Anywhere is running on http://${host}:${port}`);
});
