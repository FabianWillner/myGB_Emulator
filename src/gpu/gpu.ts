import * as http from 'http';
export class GPU {
    private server;
    private host;
    private port;

    constructor() {
        this.host = 'localhost';
        this.port = 8000;

        const requestListener = function (req: any, res: any) {
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(`<html><body><h1>This is HTML</h1>
            <canvas id="myCanvas" width="160" height="144"></canvas>
            </body></html>`);
        };

        this.server = http.createServer(requestListener);
        this.server.listen(this.port, this.host, () => {
            console.log(
                `Server is running on http://${this.host}:${this.port}`
            );
        });
    }
}
