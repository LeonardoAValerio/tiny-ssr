import { Cu } from "../components/cu.js";
import { Page } from "../lib/structure-components/page.js";
import { Widget } from "../lib/structure-components/widget.js";

export default new Page({
    title: 'Oi',
    children: [
        new Cu({
            title: "Texto1"
        }),
        "Texto",
        new Cu({
            title: "Texto2"
        })
    ]
})