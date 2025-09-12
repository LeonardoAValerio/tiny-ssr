import { Widget } from "../lib/structure-components/widget.js";

export class Text extends Widget {
    constructor(text: string, props?: { element?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
        super({
            name: "text",
            element: props?.element ?? "p",
            children: [text]
        })
    }
}