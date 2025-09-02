import { Page } from "../lib/structure-components/page.js";
import { Widget } from "../lib/structure-components/widget.js";

const page = new Page({
    title: '404',
    children: [
        new Widget({
            element: "h1",
            children: ["404"]
        }),
    ]
});

export default { page };