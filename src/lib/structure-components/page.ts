import { Widget, WidgetContent } from "./widget.js"

export interface PageConfig {
    title: string
    layout?: any
    children: WidgetContent[]
}

export class Page implements PageConfig {
    children: WidgetContent[]
    title: string

    constructor(config: PageConfig) {
        this.title = config.title;
        this.children = config.children;
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
                })
            ]
        });

        const body = new Widget({
            element: 'body',
            children: this.children
        });

        console.log(head.build());
        console.log(body.build());

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