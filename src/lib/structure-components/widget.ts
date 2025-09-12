import { parseCss } from "../utils/parseCss.js";

/**
 * `WidgetContent` type defines the possible content of a Widget.
 * It can be either a string (plain text) or another Widget instance.
 */
export type WidgetContent = string | Widget;

/**
 * Interface defining the properties that can be passed to a Widget.
 */
export interface WidgetProps {
    /**
     * The HTML tag name of the element (e.g., 'div', 'span', 'button').
     */
    element: keyof HTMLElementTagNameMap;

    /**
    * The name of the element for the compiler.
    */
    name?: string | undefined;

    /**
     * Optional attributes to set on the element, provided as key-value pairs.
     */
    attributes?: Record<string, string> | undefined;

    /**
     * Optional array of children elements or strings to be nested inside the widget.
     */
    children?: WidgetContent[] | undefined;

    /**
     * Optional array of CSS classes to apply to the element.
     */
    class?: string[] | undefined;

    /**
     * Optional ID to assign to the element.
     */
    id?: string | undefined;

    /**
     * Optional inline styles to apply to the element.
     */
    style?: Partial<CSSStyleDeclaration> | undefined;
}

/**
 * `Widget` class represents a generic HTML element with attributes, styles, classes, 
 * and nested children elements.
 *
 * This class provides a `build()` method to generate the HTML string representation
 * of the element and all its children recursively.
 */
export class Widget implements WidgetProps {
    element: keyof HTMLElementTagNameMap;
    children: WidgetContent[] | undefined;
    id: string | undefined;
    style: Partial<CSSStyleDeclaration> | undefined;
    attributes: Record<string, string> | undefined;
    name: string;
    private _class: string[] | undefined;

    /**
     * Creates a new Widget instance.
     * @param props An object containing the widget properties (tag, classes, attributes, children, etc.).
     */
    constructor(props: WidgetProps) {
        this.element = props.element;
        this.name = props.name || `${this.element}-${Date.now().toString()}`;
        this._class = props.class ?? [];
        this.children = props.children;
        this.id = props.id;
        this.attributes = props.attributes;
        this.style = props.style;
    }

    get class(): string[] {
        if(this.style) {
            return [this.name, ...this._class];
        }else {
            return this._class;
        }
    }

    /**
     * Builds the HTML string for this Widget, including its children recursively.
     * @returns A string containing the HTML markup of this widget.
     */
    buildHtml(): string {
        try {
            let element = `<${this.element} `;

            if (this.class.length > 0)
                element += `class="${this.class.join(' ')}" `;

            if (this.id)
                element += `id="${this.id}" `;

            if (this.attributes)
                Object.keys(this.attributes).forEach((key) => {
                    if (this.attributes)
                        element += `${key}="${this.attributes[key]}" `;
                });

            element += `>`;

            if (this.children)
                this.children.forEach((child) => {
                    if (typeof child === 'string')
                        element += child;
                    else
                        element += child.buildHtml();
                });

            element += `</${this.element}>`;

            return element;
        } catch(e) {
            return "";
        }
    }

    buildCss(): string {
        return this.style ? parseCss(this.style) : "";
    }
}