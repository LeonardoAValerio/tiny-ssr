# recommend packages to use
npm install --dev typescript ts-node nodemon
npm install --dev @types/node

# start packages
npx tsc --init

# base dirs
mkdir src
mkdir public
mkdir src/{app, components}

# settings git
git init
touch .gitignore
cat <<EOL > .gitignore
/node_modules
/dist
.env
EOL

# base files

## server
touch src/index.ts
cat <<EOL > .src/index.ts
import { SSRServer } from "@leonardoavalerio/tiny-ssr/lib/server/index";

const server = new SSRServer();
server.init();
EOL


## pages
touch src/app/index.ts
touch src/app/404.ts

cat <<EOL > .src/app/index.ts
import { Page } from "@leonardoavalerio/tiny-ssr/lib/structure-components/page";
import { Widget } from "@leonardoavalerio/tiny-ssr/lib/structure-components/widget";

export default new Page({
    title: 'Home',
    headers: [
        new Widget({
            element: 'link',
            attributes: {
                "href": "/base.css",
                "rel": "stylesheet"
            }
        })
        
    ],
    children: [
        new Widget({
            element: "div",
            style: {
                width: "100vw",
                height: "100vh",
                display: "flex"
                align-items: "center"
                justify-content: "center
            },
            children: [
                new Widget({
                    element: "h1",
                    children: ["Home"]
                })
            ]
        })
    ]
})
EOL

cat <<EOL > .src/app/404.ts
import { Page } from "@leonardoavalerio/tiny-ssr/lib/structure-components/page";
import { Widget } from "@leonardoavalerio/tiny-ssr/lib/structure-components/widget";

export default new Page({
    title: 'Home',
    headers: [
        new Widget({
            element: 'link',
            attributes: {
                "href": "/base.css",
                "rel": "stylesheet"
            }
        })
        
    ],
    children: [
        new Widget({
            element: "div",
            style: {
                width: "100vw",
                height: "100vh",
                display: "flex"
                align-items: "center"
                justify-content: "center
            },
            children: [
                new Widget({
                    element: "h1",
                    children: ["404"]
                })
            ]
        })
    ]
})
EOL

## public
touch public/base.css

cat <<EOL > .public/base.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
EOL

## setup-js
node setup.js