import http from 'http';
import serveHandler from 'serve-handler';

const SERVER_PORT = 3000;
const PUBLIC_PATH = 'dist';

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    return serveHandler(request, response, {
        public: PUBLIC_PATH,
        rewrites: [
            // Treat as single-page app
            {'source': '/**', 'destination': '/index.html'}
        ]
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`Running at http://localhost:${SERVER_PORT}`);
});
