import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bareServer = createBareServer('/bare/', {
    logErrors: false,
    localAddress: undefined,
    maintainer: {
        email: 'tomphttp@sys32.dev',
        website: 'https://github.com/tomphttp/',
    },
});
const port = process.env.PORT || 6969;

const app = express();
const server = http.createServer();

app.use(express.static(path.join(__dirname, 'static')));


server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res)
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(port, () => {
    console.log(`Terbium is now online at http://localhost:${port} !`)
});
