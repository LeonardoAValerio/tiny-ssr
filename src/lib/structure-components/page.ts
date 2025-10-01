import { Widget, WidgetContent } from "./widget.js";

/**
 * Interface defining the configuration for a Page.
 */
export interface PageConfig {
    /**
     * The title of the HTML page (used inside <title> tag).
     */
    title: string;

    /**
     * Array of WidgetContent to be included inside the <body> of the page.
     */
    children: WidgetContent[];

    /**
     * Optional array of WidgetContent to be included inside the <head> of the page.
     */
    headers?: WidgetContent[] | undefined;
}

/**
 * `Page` class represents a complete HTML page, including DOCTYPE, <html>, <head>, and <body> elements.
 * 
 * It uses the `Widget` class to build the HTML structure dynamically.
 */
export class Page implements PageConfig {
    headers?: WidgetContent[] | undefined;
    children: WidgetContent[];
    title: string;

    /**
     * Creates a new Page instance.
     * @param config Configuration object defining the title, body children, and optional head content.
     */
    constructor(config: PageConfig) {
        this.title = config.title;
        this.children = config.children;
        this.headers = config.headers;
    }

    /**
     * Builds the full HTML page as a string, including:
     * - <!DOCTYPE html>
     * - <html> element
     * - <head> with charset, title, and optional headers
     * - <body> with the page content
     * 
     * @returns A string containing the complete HTML page.
     */
    build(): string {
        const styles = this.buildFullCss();
        
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
                new Widget({
                    element: 'style',
                    children: [styles]
                }),
                ...this.headers ?? []
            ]
        });

        const body = new Widget({
            element: 'body',
            children: [...this.children]
        });

        const html = new Widget({
            name: "html",
            element: 'html',
            children: [
                head,
                body
            ]
        });

        let page = `<!DOCTYPE html>`;
        page += html.buildHtml();

        return page;
    }

    getAllWidgetElements() {
        const allElements = this.children.reduce<WidgetContent[]>((pre, child) => {
            if(typeof child !== "string") {
                pre.push(...child.flattenAllElements());
            }
            return pre;
        }, []);

        return allElements.filter((el) => typeof el !== "string");
    }

    buildFullCss() {
        const setStyles = new Set<String>;

        this.getAllWidgetElements().forEach((widget) => {
            setStyles.add(widget.buildCss());
        });

        return Array.from(setStyles.values()).join("");
    }
}