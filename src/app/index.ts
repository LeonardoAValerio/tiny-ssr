import { Page } from "../lib/structure-components/page.js";
import { Widget } from "../lib/structure-components/widget.js";

export default new Page({
    title: 'Oi',
    children: [
        "Texto",
        new Widget({
            element: 'div',
            children: ['Não']
        })
    ]
})