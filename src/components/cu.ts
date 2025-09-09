import { Widget } from "../lib/structure-components/widget.js";

export class Cu extends Widget {
    constructor(props: { title: string }) {
        super({
            name: "Cu",
            element: "p",
            children: [props.title],
            style: {
                backgroundColor: "red"
            }
        })
    }
}