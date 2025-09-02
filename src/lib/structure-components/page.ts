import { Widget, WidgetContent } from "./widget.js"

export interface PageConfig {
    title: string
    children: WidgetContent[]
    headers?: WidgetContent[] | undefined
}

export class Page implements PageConfig {
    headers?: WidgetContent[] | undefined
    children: WidgetContent[]
    title: string

    constructor(config: PageConfig) {
        this.title = config.title;
        this.children = config.children;
        this.headers = config.headers;
    }
    
    build(): string {
        const head = new Widget({
            element: 'head',
            children: [
                new Widget({
                    element: 'meta',
                    attributes: { charset: 'UTF-8' }
                }),
                new Widget({
                    element: 'title',
                    children: [this.title]
                }),
                ...this.headers ?? []
            ]
        });

        const body = new Widget({
            element: 'body',
            children: this.children
        });

        const html = new Widget({
            element: 'html',
            children: [
                head,
                body
            ]
        }).build();
        
        let page = `<!DOCTYPE html>`;
        page += (html);

        return page;
    }
}