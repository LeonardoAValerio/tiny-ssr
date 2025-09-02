import { Page } from "../../lib/structure-components/page.js";
import { Widget } from "../../lib/structure-components/widget.js";


const props = {
    text: "Legal"
}

const page = new Page({
    title: 'Home',
    children: [
        new Widget({
            element: 'div',
            children: [
                new Widget({
                    element: "h1",
                    children: [props.text]
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