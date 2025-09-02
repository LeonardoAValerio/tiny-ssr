import { Page } from "../../lib/structure-components/page.js";
import { Widget } from "../../lib/structure-components/widget.js";

const page = new Page({
    title: 'Home',
    children: [
        new Widget({
            element: 'div',
            children: [
                new Widget({
                    element: "h1",
                    children: ["Seção"]
                }),
                new Widget({
                    element: "a",
                    attributes: { "href": "/" },
                    children: ["Vá para Home"]
                })
            ]
        })
    ]
});

export default { page };