import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { SSRServerConfig } from './config.js';

export class SSRServer implements SSRServerConfig {
    port: number;
    pagesDir: string;
    publicDir: string;

    constructor(configs?: Partial<SSRServerConfig>) {
        this.port = configs?.port ?? 8000;
        this.pagesDir = configs?.pagesDir ?? "./src/app";
        this.publicDir = configs?.publicDir ?? "./public";
    }

    private _factoryPath(url: string) {
        if (url.includes('/.')) {
            return null
        }else if(url.includes(".")) {
            return this.publicDir + url;
        }else {
            const splitetedUrl = url.split("/");
            splitetedUrl.shift();

            if(splitetedUrl[splitetedUrl.length-1] === '') {
                splitetedUrl[splitetedUrl.length-1] = '/index'
            }

            return this.pagesDir + splitetedUrl.join('/').concat('.html');
        }
    }


    init() {
        const server = createServer((req, res) => {
            try {
                const path = this._factoryPath(req.url!);
                if (path) {
                    console.log(this._factoryPath(req.url!));
                    let file;
                    if(path.includes('.ico')) {
                        file = readFileSync(path);
                    }else {
                        file = readFileSync(path, { encoding: "utf-8" });
                    }
                    
                    res.end(file)
                }
            } catch(e) {
                const file = readFileSync("./src/app/404.html", { encoding: "utf-8" });
                res.end(file)
            }
        });

        server.on('error', (e) => {
            console.error(e)
        });

        server.listen(this.port, () => {
            console.log("Server started on port:", this.port)
        });
    }
}