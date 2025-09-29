#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function run(cmd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function writeFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content);
  console.log(`📄 Criado: ${filepath}`);
}

run("npm install --save-dev typescript ts-node nodemon @types/node");

run("npx tsc --init");

["src", "public", "src/app", "src/components"].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

run("git init");
writeFile(
  ".gitignore",
  `/node_modules
/dist
.env
`
);

writeFile(
  "src/index.ts",
  `import { SSRServer } from "@leonardoavalerio/tiny-ssr/lib/server/index";

const server = new SSRServer();
server.init();
`
);

writeFile(
  "src/app/index.ts",
  `import { Page } from "@leonardoavalerio/tiny-ssr/lib/structure-components/page";
import { Widget } from "@leonardoavalerio/tiny-ssr/lib/structure-components/widget";

export default new Page({
  title: "Home",
  headers: [
    new Widget({
      element: "link",
      attributes: {
        href: "/base.css",
        rel: "stylesheet",
      },
    }),
  ],
  children: [
    new Widget({
      element: "div",
      style: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        new Widget({
          element: "h1",
          children: ["Home"],
        }),
      ],
    }),
  ],
});
`
);

writeFile(
  "src/app/404.ts",
  `import { Page } from "@leonardoavalerio/tiny-ssr/lib/structure-components/page";
import { Widget } from "@leonardoavalerio/tiny-ssr/lib/structure-components/widget";

export default new Page({
  title: "404",
  headers: [
    new Widget({
      element: "link",
      attributes: {
        href: "/base.css",
        rel: "stylesheet",
      },
    }),
  ],
  children: [
    new Widget({
      element: "div",
      style: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        new Widget({
          element: "h1",
          children: ["404"],
        }),
      ],
    }),
  ],
});
`
);

writeFile(
  "public/base.css",
  `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`
);

const pkgPath = "./package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts.start = "npx tsc && node ./dist/index.js";
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log("✅ Setup concluído!");