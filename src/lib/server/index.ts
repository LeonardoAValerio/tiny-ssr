import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { SSRServerConfig } from './config.js';
import { Page } from '../structure-components/page.js';
import { resolve } from 'node:path';

export class SSRServer implements SSRServerConfig {
    port: number;
    pagesDir: string;
    publicDir: string;

    constructor(configs?: Partial<SSRServerConfig>) {
        this.port = configs?.port ?? 8000;
        this.pagesDir = configs?.pagesDir ?? "./dist/app";
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
                splitetedUrl[splitetedUrl.length-1] = 'index'
            }

            const path = splitetedUrl.join('/').concat('.js');
            return resolve('./', 'dist', 'app', path)
        }
    }


    init() {
        const server = createServer(async (req, res) => {
            try {
                const path = this._factoryPath(req.url!);
                if (path) {
                    console.log(this._factoryPath(req.url!));
                    let file;
                    if(path.includes('.ico')) {
                        file = readFileSync(path);
                    }else {
                        const module = await import(path);
                        file = (module.default.page) as Page;
                        file = file.build();
                        console.log(file)
                    }

                    
                    res.end(file)
                }
            } catch(e) {
                console.log(e)
                const path = this._factoryPath('/404')!;
                const module = await import(path);
                const file = (module.default.page) as Page;
                res.end(file.build())
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