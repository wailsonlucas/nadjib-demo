import express from 'express';
import https from 'https';
import fs from 'fs';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
  // console.log('4')

app.prepare().then(() => {
  const server = express();

  // Load SSL certificate and key
  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };

  server.all('*', (req, res) => {
    return handle(req, res);
  });
  https.createServer(options, server).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});