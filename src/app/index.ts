import { Text } from "../components/Text.js";
import { Page } from "../lib/structure-components/page.js";
import { Widget } from "../lib/structure-components/widget.js";

export default new Page({
    title: 'Oi',
    children: [
        new Text("Texto1"),
        "Texto",
        new Text("Texto2"),
    ]
})