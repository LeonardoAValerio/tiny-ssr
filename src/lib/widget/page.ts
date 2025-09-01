import { Widget } from "./widget.js"

export interface PageConfig {
    title: string
    layout?: any
    children: Widget[]
}

export class Page implements PageConfig {
    children: Widget[]
    layout?: any
    title: string

    constructor(config: PageConfig) {
        this.title = config.title;
        this.children = config.children;
        this.layout = config.layout;
    }
    
    build(): {

    }
}