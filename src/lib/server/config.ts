/**
 * Configuration options for the {@link SSRServer}.
 */
export interface SSRServerConfig {
  /**
   * Port where the HTTP server will run.
   * 
   * @example 3000
   */
  port: number;

  /**
   * Directory containing the precompiled SSR pages.
   * Typically points to your build output (e.g., `./dist/app`).
   *
   * @example "./dist/app"
   */
  pagesDir: string;

  /**
   * Directory containing static/public assets.
   * Files requested with an extension (e.g., `.css`, `.js`) 
   * are resolved here.
   *
   * @example "./public"
   */
  publicDir: string;
}