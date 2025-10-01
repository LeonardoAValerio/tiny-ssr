import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { SSRServerConfig } from './config.js';
import { Page } from '../structure-components/page.js';
import { resolve } from 'node:path';

/**
 * A lightweight Server-Side Rendering (SSR) server implementation.
 *
 * This server maps incoming HTTP requests to either:
 * - Static assets (from `/public`), or
 * - Precompiled pages (from `/dist/app`).
 *
 * @example
 * ```ts
 * const server = new SSRServer({ port: 3000 });
 * server.init();
 * ```
 */
export class SSRServer implements SSRServerConfig {
  /** Port on which the HTTP server will listen */
  port: number;

  /** Directory where precompiled pages are located */
  pagesDir: string;

  /** Directory where static/public assets are located */
  publicDir: string;

  /**
   * Creates a new instance of the SSR server.
   *
   * @param configs - Optional initialization configs:
   * - `port`: Port where the server will run (default: `8000`).
   * - `pagesDir`: Path to the compiled pages directory (default: `./dist/app`).
   * - `publicDir`: Path to the public assets directory (default: `./public`).
   */
  constructor(configs?: Partial<SSRServerConfig>) {
    this.port = configs?.port ?? 8000;
    this.pagesDir = configs?.pagesDir ?? "./dist/app";
    this.publicDir = configs?.publicDir ?? "./public";
  }

  /**
   * Maps a request URL to the corresponding file path on disk.
   *
   * - Ignores hidden files (`/.`).
   * - If the URL contains an extension (`.`), it's treated as a public file.
   * - Otherwise, it's resolved to a precompiled SSR page.
   *
   * @param url - The request URL.
   * @returns The resolved file path or `null` if invalid.
   */
  private _factoryPath(url: string): string | null {
    if (url.includes("/.")) {
      return null;
    } else if (url.includes(".")) {
      return resolve(this.publicDir, "." + url);
    } else {
      const splitetedUrl = url.split("/");
      splitetedUrl.shift();

      if (splitetedUrl[splitetedUrl.length - 1] === "") {
        splitetedUrl[splitetedUrl.length - 1] = "index";
      }

      const path = splitetedUrl.join("/").concat(".js");
      return resolve(this.pagesDir, path);
    }
  }

  /**
   * Starts the SSR server.
   *
   * - Serves static files from the `public` directory.
   * - Loads and renders precompiled pages from `pagesDir`.
   * - Falls back to `404.ts` if a route is not found.
   */
  init() {
    const server = createServer(async (req, res) => {
      try {
        const path = this._factoryPath(req.url!);
        if (path) {
          let file;
          if (path.includes("/public")) {
            try {
              file = readFileSync(path);
            } catch (e) {
              console.log(`[ERROR] Unknown public file ${e}`);
            }
          } else {
            const module = await import(`file://${path}`);
            file = module.default as Page;
            file = file.build();
          }
          console.log(`[INFO] Access route ${path}`);
          res.end(file);
        }
      } catch (e) {
        console.log(
          `[ERROR] ${e}\nredirecting to ${this.pagesDir}/404.ts`
        );
        const path = this._factoryPath("/404")!;
        const module = await import(`file://${path}`);
        const file = module.default as Page;
        res.end(file.build());
      }
    });

    server.on("error", (e) => {
      console.error(e);
    });

    server.listen(this.port, () => {
      console.log("Server started on port:", this.port);
    });
  }
}