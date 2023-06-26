import createBareServer from "@tomphttp/bare-server-node";
import http from "node:http";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import nodeStatic from "node-static";
import serveStatic from 'serve-static';

const httpServer = http.createServer();
const serve = serveStatic(
	fileURLToPath(new URL('./static/', import.meta.url)),
	{
		fallthrough: false,
	}
);

const bareServer = createBareServer('/bare/');

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		serve(req, res, (err) => {
			res.writeHead(err?.statusCode || 500, {
				'Content-Type': 'text/plain',
			});
			res.end(err?.stack);
		});
	}
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
	console.log('HTTP server listening');
});

httpServer.listen({
	port: process.env.PORT || 6969,
});