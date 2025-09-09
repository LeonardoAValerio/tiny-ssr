export function parseCss(css: Partial<CSSStyleDeclaration>) {
    const properties = Object.keys(css);
    const text = properties.reduce((styles, p) => {
        const propertie = p.replace(/([A-Z])/g, (match) => "-" + match.toLowerCase());

        return styles + `${propertie}: ${css[p]};`
    }, "")

    return text;
}

