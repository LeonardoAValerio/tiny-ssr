export type WidgetContent = string | Widget;

export interface WidgetProps {
    element: keyof HTMLElementTagNameMap
    attributes?: Record<string, string> | undefined
    children?: WidgetContent[] | undefined
    class?: string[] | undefined
    id?: string | undefined
    style?: Partial<CSSStyleDeclaration> | undefined
}

export class Widget implements WidgetProps {
    element: keyof HTMLElementTagNameMap 
    class: string[] | undefined
    children: WidgetContent[] | undefined
    id: string | undefined
    style: Partial<CSSStyleDeclaration> | undefined
    attributes: Record<string, string> | undefined

    constructor(props: WidgetProps) {
        this.element = props.element;
        this.class = props.class;
        this.children = props.children;
        this.id = props.id;
        this.attributes = props.attributes;
    }

    build() {
        let element = "";

        element += (`<${this.element} `)
        if(this.class)
            element += (`class="${this.class.join(' ')}"`)

        if(this.id)
            element += (`id="${this.id}"`)

        if(this.attributes)
            Object.keys(this.attributes).forEach((key) => {
                if(this.attributes)
                    element += (`${key}="${this.attributes[key]}"`)
            })
        element += (`>`)

        if(this.children) 
            this.children.forEach((child) => {
                if(typeof child === 'string')
                    element += (child)
                else 
                    element += (child.build())
            })

        element += (`</${this.element}>`)

        return element;
    }
}